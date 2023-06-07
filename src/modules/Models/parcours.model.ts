import { DataTypes, Model } from "sequelize";
import sequelize from "../../Database/sequelize";

export class Parcours extends Model {
	id_parcours: number;

	name: string;
}

const concatRequiredMessage = (data: string) => {
	return `Le champ ${data} est requis`;
};

Parcours.init(
	{
		id_parcours: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: { msg: concatRequiredMessage("nom du parcours") },
			},
		}
    },
	{
		sequelize,
		modelName: "parcours",
		timestamps: false,
		freezeTableName: true,
	}
);