import { IRepository } from "../core/repository.interface";
import { IService } from "../core/service.interface";
import { TokenDto } from "../Dto/token.dto";
import { Token } from "../Models/token.model";


export class TokenService implements IService<TokenDto> {
	private tokenRepository: IRepository<TokenDto>;

	constructor(tokenRepository: IRepository<TokenDto>) {
		this.tokenRepository = tokenRepository;
	}

	/**
	 *
	 * @param options
	 * @returns
	 */
	async findAll(options?: any): Promise<Array<TokenDto> | null> {
		return this.tokenRepository.findAll(options).then((data) => {
			return data;
		});
	}

	/**
	 *
	 * @param id
	 * @returns
	 */
	async findById(id: number): Promise<TokenDto | null> {
		return this.tokenRepository.findById(id).then((data) => {
			console.log(data);
			return data;
		});
	}

	/**
	 *
	 * @param t
	 * @returns
	 */
	async create(token: TokenDto): Promise<TokenDto | null> {
		return this.tokenRepository.create(token).then((data) => {
			return data;
		});
	}

	/**
	 *
	 * @param t
	 * @returns
	 */
	async update(token: TokenDto, id: number): Promise<boolean | number> {
		return this.tokenRepository.update(token, id).then((data) => {
			return data;
		});
	}

	/**
	 *
	 * @param id
	 * @returns
	 */
	async delete(id: number): Promise<boolean | number> {
		return this.tokenRepository
			.delete(id)
			.then((data: boolean | number) => {
				return data;
			});
	}
}
