import { DataTypes, Model } from "sequelize";
import sequelize from "../../Database/sequelize";

export class User extends Model {
	id_pseudo: number;

	pseudo: string;

    password: string;

	age!: string;

	email!: string;

    is_admin: boolean;
}

const concatRequiredMessage = (data: string) => {
	return `Le champ ${data} est requis`;
};

User.init(
	{
		id_pseudo: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		pseudo: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: { msg: concatRequiredMessage("Pseudo") },
			},
		},
        password: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: { msg: concatRequiredMessage("Mot de passe") },
            },
        },
		age: {
			type: DataTypes.STRING,
		},
		
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: { msg: concatRequiredMessage("email") },
			},
		},
        is_admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
	},
	{
		sequelize,
		modelName: "utilisateur",
		freezeTableName: true,
		defaultScope: {
			attributes: { exclude: ["password"] },
		},
		scopes: {
			withPassword: {
				attributes: { include: ["password"] },
			},
		},
	}
);