class AppConfig {
	config;

	constructor() {
		this.config = {
			secret: {
				key: "Stock-Image-Service"
			},
			port: 3000,
			baseUrl: "http://localhost:3000"
		};
	}
}

export default new AppConfig().config;
