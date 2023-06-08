import { BadgeDto } from "../Dto/badge.dto";
import { FullUserDto, UserDto } from "../Dto/user.dto";
import { Badge } from "../Models/badge.model";
import { User } from "../Models/utilisateur.model";

export class UserMapper {
	static MapToDto(user: User | null): UserDto {
		if (user === null) return null as any;

        let badges: Badge[] = user.get({ plain: true }).badges;

		const badgesData = badges.map((badge) => {
			const badgeDto: BadgeDto = {
                id_badge: badge.id_badge,
                name: badge.name,
                image: badge.image,
            };
			return badgeDto;
		});

		const Dto: UserDto = {
            pseudo: user.pseudo,
            birthdate: user.birthdate,
            city: user.city,
            zip_code: user.zip_code,
            email: user.email,
            badges: badgesData,
        };
		return Dto;
	}

	static MapFullToDto(user: User | null): FullUserDto {
		if (user === null) return null as any;

		const Dto: FullUserDto = {
            id_pseudo: user.id_pseudo,
            pseudo: user.pseudo,
            birthdate: user.birthdate,
            city: user.city,
            zip_code: user.zip_code,
            email: user.email,
            password: user.password,
            is_admin: user.is_admin,
        };
		return Dto;
	}

}