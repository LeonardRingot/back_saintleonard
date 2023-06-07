import { DataTypes, Model } from "sequelize";
import sequelize from "../../Database/sequelize";

export class Token extends Model {
	id_token!: number;

	refresh_token: string;

	id_pseudo!:number;
}

const concatRequiredMessage = (data: string) => {
	return `Le champ ${data} est requis`;
};

Token.init(
	{
		id_token: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		refresh_token: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: { msg: concatRequiredMessage("Refresh Token") },
			},
		},
		id_pseudo: {
			type: DataTypes.INTEGER,
		}
	},
	{
		sequelize,
		modelName: "token",
		freezeTableName: true,
	}
);