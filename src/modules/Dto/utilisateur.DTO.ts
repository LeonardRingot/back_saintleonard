import { BadgeDto } from "./badge.dto";


export interface UserDto {
	pseudo: string;
	
    birthdate: string;
	
	age?: number;

	email: string;

	badges?: BadgeDto[];
}

export interface FullUserDto {
	id_pseudo: number;
	
	pseudo: string;

	password: string;

    birthdate: string;

	email: string;

    is_admin: boolean;
}

export interface AuthUserDto {
	pseudo: string;

	password: string;
}
export interface AuthAdminUserDto {
	email: string;
	password: string;
}