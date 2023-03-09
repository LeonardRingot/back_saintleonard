import { DataTypes, Model } from "sequelize";
import sequelize from "../../Database/sequelize";

export class QCM extends Model {
	[x: string]: any;
	id_qcm: number;

	question: string;

    correct_response: string;

	optiona: string;

	optionb: string;

	optionc: string;

	optiond: string;

}

const concatRequiredMessage = (data: string) => {
	return `Le champ ${data} est requis`;
};

QCM.init(
	{
		id_qcm: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		question: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: { msg: concatRequiredMessage("Question du QCM") },
			},
		},
        correct_response: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: concatRequiredMessage("La reponse correct") },
            },
        },
        optiona: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: concatRequiredMessage("L'option A") },
            },
        },
        optionb: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: concatRequiredMessage("L'option B") },
            },
        },
        optionc: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: concatRequiredMessage("L'option C") },
            },
        },
        optiond: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: concatRequiredMessage("L'option D") },
            },
        },
	},
	{
		sequelize,
		modelName: "qcm",
		timestamps: false,
		freezeTableName: true
	}
);