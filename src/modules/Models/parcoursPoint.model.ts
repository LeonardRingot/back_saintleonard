import { DataTypes, Model } from "sequelize";
import sequelize from "../../Database/sequelize";
import { Parcours } from "./parcours.model";
import { Point } from "./points.model";


export class ParcoursPoint extends Model {
	id: number;

    parcourIdParcours!: number;

    id_point!: number;
}

ParcoursPoint.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		parcourIdParcours: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Parcours,
                key: 'id_parcours',
            },
        },
        pointIdPoint: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Point,
                key: 'id_point',
            },
        },
	},
	{
		sequelize,
		modelName: "parcourspoint",
		timestamps: false,
		freezeTableName: true,
	}
);