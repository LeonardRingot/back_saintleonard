import { DataTypes, Model } from "sequelize";
import sequelize from "../../Database/sequelize";
import { Parcours } from "./parcours.model";
import { Point } from "./points.model";


export class ParcoursPoint extends Model {
    parcourIdParcours!: number;

    pointIdPoint!: number;

    positionParcours: number;
}

ParcoursPoint.init(
	{
		parcourIdParcours: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: Parcours,
                key: 'id_parcours',
            },
        },
        pointIdPoint: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: Point,
                key: 'id_point',
            },
        },
        positionParcours: {
            type: DataTypes.INTEGER
        },
	},
	{
		sequelize,
		modelName: "parcourspoint",
		timestamps: false,
		freezeTableName: true,
	}
);