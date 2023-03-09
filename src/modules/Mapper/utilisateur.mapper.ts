import { UserAuthDto, UserDto } from "../Dto/utilisateur.dto";
import { User } from "../Models/utilisateur.model";

export class UserMapper {
	static MapToDto(user: User | null): UserDto {
		if (user === null) return null as any;

		const Dto: UserDto = {
            pseudo: user.pseudo,
            age: user.age,
            email: user.email,
        };
		return Dto;
	}

	static MapAuthToDto(user: User | null): UserAuthDto {
		if (user === null) return null as any;

		const Dto: UserAuthDto = {
            id_pseudo: user.id_pseudo,
            pseudo: user.pseudo,
            age: user.age,
            email: user.email,
            password: user.password,
            is_admin: user.is_admin
        };
		return Dto;
	}
	

}