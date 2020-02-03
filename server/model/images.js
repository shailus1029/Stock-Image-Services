import sequelize from "sequelize";
import psql from "../config/db";

class ImagesModel {
	image;

	constructor() {
		this.image = psql.define("images", {
			id: {
				type: sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			imageUrl: {
				type: sequelize.STRING,
				allowNull: false
			},
			tags: {
				type: sequelize.ARRAY(sequelize.STRING),
				defaultValue: []
			},
			descriptions: {
				type: sequelize.TEXT
			}
		});
	}
}

export default new ImagesModel().image;
