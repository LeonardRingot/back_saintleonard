export interface UserDto {
	pseudo: string;

    age: string;

	email: string;
}

export interface UserAuthDto {
	id_pseudo: number;
	
	pseudo: string;

	password: string;

    age: string;

	email: string;

    is_admin: boolean;
}	