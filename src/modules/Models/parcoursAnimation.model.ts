import { DataTypes, Model } from "sequelize";
import sequelize from "../../Database/sequelize";
import { Parcours } from "./parcours.model";
import { Animation } from "./animation.model";


export class ParcoursAnimation extends Model {
    parcourIdParcours!: number;

    animationIdAnimation!: number;

    positionParcours: number;
}

ParcoursAnimation.init(
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
        animationIdAnimation: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: Animation,
                key: 'id_animation',
            },
        },
        positionParcours: {
            type: DataTypes.INTEGER
        },
	},
	{
		sequelize,
		modelName: "parcoursanimation",
		timestamps: false,
		freezeTableName: true,
	}
);