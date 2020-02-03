import express from "express";
import controller from "../api/controller/images";
import multer from "multer";
import path from "path";
class ImagesRoute {
	router;
	uploadLocal;
	csvLimits = {
		files: 10,
		fileSize: 2 * 102400 * 102400
	};

	constructor() {
		this.router = express.Router();
		this.uploadLocal = multer({
			dest: path.resolve(path.join(__dirname, "../uploads")),
			limits: this.csvLimits
		});
		this.routing();
	}
	routing() {
		this.router.get("/", controller.searchImages);
		this.router.post("/bulkUpload", this.uploadLocal.array("fileUpload", 20), controller.imagesUpload);
	}
}

export default new ImagesRoute().router;
