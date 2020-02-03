class AppConfig {
	config;

	constructor() {
		this.config = {
			secret: {
				key: "Stock-Image-Service"
			},
			port: 9005,
			baseUrl: "http://localhost:9005"
		};
	}
}

export default new AppConfig().config;
