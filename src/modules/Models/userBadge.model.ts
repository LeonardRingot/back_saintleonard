import { DataTypes, Model } from "sequelize";
import sequelize from "../../Database/sequelize";
import { User } from "./utilisateur.model";
import { Badge } from "./badge.model"

export class UserBadge extends Model {
    utilisateurIdPseudo!: number;

    badgeIdBadge!: number;
}

UserBadge.init(
	{
		utilisateurIdPseudo: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: User,
                key: 'id_pseudo',
            },
        },
        badgeIdBadge: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: Badge,
                key: 'id_badge',
            },
        },
	},
	{
		sequelize,
		modelName: "userbadge",
		timestamps: false,
		freezeTableName: true,
	}
);