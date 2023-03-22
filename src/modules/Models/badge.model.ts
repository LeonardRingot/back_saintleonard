import { DataTypes, Model } from "sequelize";
import sequelize from "../../Database/sequelize";

export class Badge extends Model {
	id_badge: number;

	name: string;

    image: string;
}

const concatRequiredMessage = (data: string) => {
	return `Le champ ${data} est requis`;
};

Badge.init(
	{
		id_badge: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: { msg: concatRequiredMessage("Nom du Badge") },
			},
		},
		image: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: { msg: concatRequiredMessage("image du Badge") },
			},
		}
	},
	{
		sequelize,
		modelName: "badge",
		timestamps: false,
		freezeTableName: true,
	}
);