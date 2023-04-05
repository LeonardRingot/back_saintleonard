import { DataTypes, Model } from "sequelize";
import sequelize from "../../Database/sequelize";
import { Animation } from "./animation.model";
import { SimpleQuestion } from "./simpleQuestion.model";

export class AnimationSq extends Model {
    animationIdAnimation!: number;

    simpleQuestionIdSimpleQuestion!: number;
}

AnimationSq.init(
	{
		animationIdAnimation: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: Animation,
                key: 'id_animation',
            },
        },
        simpleQuestionIdSimpleQuestion: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: SimpleQuestion,
                key: 'id_simple_question',
            },
        },
	},
	{
		sequelize,
		modelName: "animationsq",
		timestamps: false,
		freezeTableName: true,
	}
);