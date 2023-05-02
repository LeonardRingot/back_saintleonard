import { DataTypes, Model } from "sequelize";
import sequelize from "../../Database/sequelize";

export class Animation extends Model {
	id_animation: number;

	name: string;
}

const concatRequiredMessage = (data: string) => {
	return `Le champ ${data} est requis`;
};

Animation.init(
	{
		id_animation: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: { msg: concatRequiredMessage("Nom de l'animation") },
			},
		},
	},
	{
		sequelize,
		modelName: "animation",
		timestamps: false,
		freezeTableName: true,
	}
);