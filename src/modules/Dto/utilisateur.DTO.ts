export interface UserDto {
	pseudo: string;

    age: string;

	email: string;
}

export interface FullUserDto {
	id_pseudo: number;
	
	pseudo: string;

	password: string;

    age: string;

	email: string;

    is_admin: boolean;
}

export interface AuthUserDto {
	pseudo: string;

	password: string;
}