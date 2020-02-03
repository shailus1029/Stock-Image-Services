"use strict";

import express from "express";
import cors from "cors";
import bodyParser from "body-parser"; //Parse incoming request bodies in a middleware before handlers or controllers, available under the req.body property
import path from "path";

class appConfig {
	//An important difference between function declarations and class declarations in javascript is that function declarations are hoisted and class declarations are not. i,e class should be declare first then access it.
	app;

	constructor() {
		this.app = express();
		this.config();
	}

	config() {
		this.app.use(bodyParser.json()); //Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.
		this.app.use(cors()); // cross origin resource sharing, CORS defines a way in which a browser and server can interact to determine whether or not it is safe to allow the cross-origin request. In this case requests from all origins will be accepted
		this.app.use(bodyParser.json({ limit: "10mb", extended: true }));
		this.app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
		this.app.use(function(req, res, next) {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
			res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH");
			next();
		});

		this.app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
		this.app.use("/", express.static(path.join(__dirname, "../client/bundle")));

		this.app.get("/", function(req, res) {
			res.sendFile(path.join(__dirname, "../client/bundle/index.html"));
		});
	}
}

export default new appConfig().app;
