import axios from "axios";

const utils = {
	searchImages: body => {
		console.log("body ====>>>>>", body);
		const tags = body.tags || "";
		const from = body.fromDate || "";
		const to = body.toDate || "";
		const descriptions = body.descriptions || "";

		let url = `http://localhost:9005/api/images` + (tags ? "?tags=" + tags : "") + (from ? "&from=" + from : "") + (to ? "&to=" + to : "") + (descriptions ? "&descriptions=" + descriptions : "");

		return axios.get(url);
	}
};

export default utils;
