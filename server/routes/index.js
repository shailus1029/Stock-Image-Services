import app from "../app";
import ImagesRoute from "./images";
import path from "path";

class CentralRoute {
	constructor() {
		this.initiateRoutes(app);
	}

	initiateRoutes(app) {
		app.use("/api/images", ImagesRoute);
		app.get("*", function(req, res) {
			res.sendFile(path.join(__dirname, "../../client/build/index.html"));
		});
	}
}

export default new CentralRoute();
