import { Sequelize } from "sequelize";
import * as dotenv from 'dotenv'

dotenv.config()

const sequelize = new Sequelize(
    process.env.DB_DATABASE!,
    process.env.DB_USERNAME!,
    process.env.DB_PASSWORD,
    {
        host: 'localhost',
        dialect: 'postgres',
        port: 5432,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });

    sequelize
	.authenticate()
	.then(() =>
		console.log("La connextion à la base de donnée à bien était établie")
	)
	.catch((error: Error) =>
		console.error(`Impossible de se connecter à la base de données ${error}`)
	);


export default sequelize;