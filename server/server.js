import app from "./app";
import http from "http";
import os from "os";
import cluster from "cluster";
import routes from "./routes";
import "babel-polyfill";
import appConfig from "./config";

routes.initiateRoutes(app);
const cores = os.cpus().length; // os.cpus() returns an array of objects containing information about each logical CPU core
const server = http.createServer(app); // creating a http server referencing this app

server.listen(appConfig.port); // listening server to a specified port.
server.on("error", error);
server.on("listening", connected);

function connected() {
	if (cluster.isMaster) {
		console.log(`Master of PID: ${process.pid} started at ${new Date()} at port ${appConfig.port}`);
	} else {
		console.log(`Worker PID: ${process.pid} started at ${new Date()}`);
	}
}

function error(err) {
	console.log(`Error Occured while starting the server ${err}`);
}
