import { TokenDto } from "../Dto/token.dto"; 
import { Token } from "../Models/token.model";

export class TokenMapper {
	static MapToDto(token: Token | null): TokenDto {
		if (token === null) return null as any;

		const Dto: TokenDto = {
			refresh_token: token.refresh_token,
			id_pseudo: token.id_pseudo
		};
		return Dto;
	}
}