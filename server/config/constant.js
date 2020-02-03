export default function cred() {
	if (!process.env.NODE_ENV || process.env.NODE_ENV === "dev") {
		return {
			port: 2000,
			db: {
				postgres: {
					name: "stock-image-service",
					dialect: "postgres",
					username: "postgres",
					password: "cronj",
					host: "localhost",
					port: 5432,
					backup: false
				}
			}
		};
	} else if (process.env.NODE_ENV === "stage") {
		return {
			port: 80,
			db: {
				postgres: {
					name: "stock-image-service",
					dialect: "postgres",
					username: "postgres",
					password: "cronj",
					host: "localhost",
					port: 5432,
					backup: false
				}
			}
		};
	} else if (process.env.NODE_ENV === "prod") {
		return {
			port: 80,
			db: {
				postgres: {
					name: "stock-image-service",
					dialect: "postgres",
					username: "postgres",
					password: "cronj",
					host: "localhost",
					port: 5432,
					backup: false
				}
			}
		};
	}
}
