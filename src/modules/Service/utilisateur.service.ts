import { UserDto } from "../Dto/utilisateur.dto";
import { IRepository } from "../core/repository.interface";
import { User } from "../Models/utilisateur.model";
import { IService } from "../core/service.interface";

export class UserService implements IService<UserDto> {
	private userRepository: IRepository<UserDto>;

	constructor(userRepository: IRepository<UserDto>) {
		this.userRepository = userRepository;
	}

	/**
	 *
	 * @param options
	 * @returns
	 */
	async findAll(options?: any): Promise<Array<UserDto> | null> {
		return this.userRepository.findAll(options).then((data) => {
			return data;
		});
	}

	/**
	 *
	 * @param id
	 * @returns
	 */
	async findById(id_td_user: number): Promise<UserDto | null> {
		return this.userRepository.findById(id_td_user).then((data) => {
			console.log(data);
			return data;
		});
	}

	/**
	 *
	 * @param t
	 * @returns
	 */
	async create(user: User): Promise<UserDto | null> {
		return this.userRepository.create(user).then((data) => {
			return data;
		});
	}

	/**
	 *
	 * @param t
	 * @returns
	 */
	async update(user: User, id_td_user: number): Promise<boolean | number> {
		return this.userRepository.update(user, id_td_user).then((data) => {
			return data;
		});
	}

	/**
	 *
	 * @param id
	 * @returns
	 */
	async delete(id_td_user: number): Promise<boolean | number> {
		return this.userRepository
			.delete(id_td_user)
			.then((data: boolean | number) => {
				return data;
			});
	}
}
