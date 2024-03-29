import { DataTypes, Model } from "sequelize";
import sequelize from "../../Database/sequelize";

export class Point extends Model {
	id_point: number;

	name: string;

    small_description: string;

	main_description: string;

    lat: number;

    lon: number;

	qrcode: string;

	parcourspoint!: any;
}

const concatRequiredMessage = (data: string) => {
	return `Le champ ${data} est requis`;
};

Point.init(
	{
		id_point: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: { msg: concatRequiredMessage("Nom du point d'interet") },
			},
		},
        small_description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: concatRequiredMessage("petite description carte") },
            },
        },
        main_description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: { msg: concatRequiredMessage("Description principale") },
            },
        },
		lat: {
			type: DataTypes.DOUBLE,
		},
		lon: {
			type: DataTypes.DOUBLE,
		},
        qrcode: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: concatRequiredMessage("QR Code") },
            },
        },
	},
	{
		sequelize,
		modelName: "point",
		timestamps: false,
		freezeTableName: true,
	}
);