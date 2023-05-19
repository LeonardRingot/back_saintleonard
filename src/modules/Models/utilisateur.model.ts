import { DataTypes, Model } from "sequelize";
import sequelize from "../../Database/sequelize";
import { Badge } from "./badge.model";

export class User extends Model {
	id_pseudo: number;

	pseudo: string;

    password: string;

	birthdate!: string;

	city: string;

	zip_code: string;

	email!: string;

    is_admin: boolean;

	public addBadge!: (badge: Badge) => Promise<void>;
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
			type: DataTypes.STRING(50),
			allowNull: false,
			validate: {
				notEmpty: { msg: concatRequiredMessage("Pseudo") },
			},
		},
        password: {
            type: DataTypes.STRING(100),
            validate: {
                notEmpty: { msg: concatRequiredMessage("Mot de passe") },
            },
        },
		birthdate: {
			type: DataTypes.DATE,
		},
		city: {
			type: DataTypes.STRING(100),
		},
		zip_code: {
			type: DataTypes.STRING(10),
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