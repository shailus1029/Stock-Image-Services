import ImagesService from "../services/images";
import rp from "request-promise";
import ImageModel from "../../model/images";
import sequelize from "sequelize";
const Op = sequelize.Op;

class ImagesController {
	controller;

	constructor() {}

	checkValidKeys(params) {
		return true;
	}

	searchImages(req, res) {
		return new Promise((resolve, reject) => {
			if (!new ImagesController().checkValidKeys(req.query)) {
				return reject({ invalidSearchKeys: true });
			}
			return resolve(true);
		})
			.then(resolved => {
				let where = {};
				const searchKeys = req.query.tags ? req.query.tags.split(",") : [];
				console.log(searchKeys, new Date(req.query.from), new Date(req.query.to));
				Object.keys(req.query).map(key => {
					if (key === "tags") {
						let ORS = searchKeys.map((item, i) => {
							return { [Op.contains]: [item] };
						});
						where.tags = {
							[Op.or]: ORS
						};
					} else if (key === "descriptions") {
						where.descriptions = { [Op.iLike]: `%${req.query.desc}%` };
					}
				});

				if (req.query.from && new Date(req.query.from) != "Invalid Date" && req.query.to && new Date(req.query.to) != "Invalid Date") {
					where.created_at = { [Op.and]: { [Op.gte]: new Date(req.query.from), [Op.lte]: new Date(req.query.to) } };
				} else if (req.query.from && new Date(req.query.from) != "Invalid Date") {
					where.created_at = { [Op.gte]: new Date(req.query.from) };
				} else if (req.query.to && new Date(req.query.to) != "Invalid Date") {
					where.created_at = { [Op.lte]: new Date(req.query.to) };
				}

				console.log(where);
				return ImageModel.findAll({
					where,
					order: [["created_at", "DESC"]]
				});
			})
			.then(data => {
				console.log("data ====>>>", data);
				res.send(data);
			})
			.catch(err => {
				console.log("err=====>>>", err);
			});
	}

	imagesUpload(req, res) {
		const otherData = req.body.imagesData ? JSON.parse(req.body.imagesData) : [];
		let imagesBody = [];
		for (let i = 0; i < req.files.length; i++) {
			const image = {};
			const fileName = req.files[i].originalname;
			otherData.map(item => {
				for (let key in item) {
					if (key == fileName) {
						image.descriptions = item[key].description;
						image.tags = item[key].tags;
						image.imageUrl = `/uploads/${req.files[i].filename}`;
						imagesBody.push(image);
					}
				}
			});
		}
		return ImageModel.bulkCreate(imagesBody)
			.then(data => {
				res.send(data);
			})
			.catch(err => {
				console.log("err ===>>>", err);
			});
	}
}
export default new ImagesController();
