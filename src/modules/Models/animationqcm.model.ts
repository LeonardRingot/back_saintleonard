import { DataTypes, Model } from "sequelize";
import sequelize from "../../Database/sequelize";
import { Animation } from "./animation.model";
import { QCM } from "./qcm.model";

export class AnimationQcm extends Model {
    animationIdAnimation!: number;

    qcmIdQcm!: number;
}

AnimationQcm.init(
	{
		animationIdAnimation: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: Animation,
                key: 'id_animation',
            },
        },
        qcmIdQcm: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: QCM,
                key: 'id_qcm',
            },
        },
	},
	{
		sequelize,
		modelName: "animationqcm",
		timestamps: false,
		freezeTableName: true,
	}
);