import { DataTypes, Model } from "sequelize";
import sequelize from "../../Database/sequelize";

export class SimpleQuestion extends Model {
	id_simple_question: number;

	question: string;

    response: string;
}

const concatRequiredMessage = (data: string) => {
	return `Le champ ${data} est requis`;
};

SimpleQuestion.init(
	{
		id_simple_question: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		question: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: { msg: concatRequiredMessage("Question") },
			},
		},
        response: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: concatRequiredMessage("Reponse") },
            },
        }
	},
	{
		sequelize,
		modelName: "simple_question",
		timestamps: false,
		freezeTableName: true,
	}
);