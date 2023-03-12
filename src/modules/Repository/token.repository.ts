
import { IRepository } from "../core/repository.interface";
import { NotFoundError } from "../core/errors/errors";
import { TokenDto } from "../Dto/token.dto";
import { Token } from "../Models/token.model";
import { TokenMapper } from "../Mapper/token.mapper";

export class TokenRepository implements IRepository<TokenDto> {

	/**
	 *
	 * @param id_token
	 * @returns
	 */
	async findById(id_token: number): Promise<TokenDto | null> {
		const result = await Token.findByPk(id_token);
		if (result === null) throw new NotFoundError("Token not found");
		return TokenMapper.MapToDto(result);
	}

	/**
	 *
	 * @param filter
	 * @returns
	 */
	async findAll(filter: any): Promise<Array<TokenDto>> {
		return Token.findAll({
			where: filter,
		}).then((data: Array<Token>) => {
			return data.map((token: Token) => {
				return TokenMapper.MapToDto(token);
			});
		});
	}

	/**
	 *
	 * @param token
	 */
	async create(token: Partial<TokenDto>): Promise<TokenDto> {
		return Token.create(token).then((data: Token) => {
			return TokenMapper.MapToDto(data);
		});
	}

	/**
	 *
	 * @param token
	 */
	async update(token: TokenDto, id: number): Promise<boolean | number> {
		return Token.update(token, { where: { id_token: id } }).then(
			(data: Array<boolean | number>) => {
				return data[0];
			}
		);
	}

	/**
	 *
	 * @param id
	 */
	async delete(id: number): Promise<boolean | number> {
		return Token.destroy({ where: { id_token: id } }).then(
			(data: boolean | number) => {
				return data;
			}
		);
	}
}