import { IRepository } from "../core/repository.interface";
import { IService } from "../core/service.interface";
import { BadgeDto } from "../Dto/badge.dto";
import { Badge } from "../Models/badge.model";

export class BadgeService implements IService<BadgeDto> {
	private badgeRepository: IRepository<BadgeDto>;

	constructor(badgeRepository: IRepository<BadgeDto>) {
		this.badgeRepository = badgeRepository;
	}

	/**
	 *
	 * @param options
	 * @returns
	 */
	async findAll(options?: any): Promise<Array<BadgeDto> | null> {
		return this.badgeRepository.findAll(options).then((data) => {
			return data;
		});
	}

	/**
	 *
	 * @param id
	 * @returns
	 */
	async findById(id: number): Promise<BadgeDto | null> {
		return this.badgeRepository.findById(id).then((data) => {
			console.log(data);
			return data;
		});
	}

	/**
	 *
	 * @param t
	 * @returns
	 */
	async create(badge: Badge): Promise<BadgeDto | null> {
		return this.badgeRepository.create(badge).then((data) => {
			return data;
		});
	}

	/**
	 *
	 * @param t
	 * @returns
	 */
	async update(badge: Badge, id: number): Promise<boolean | number> {
		return this.badgeRepository.update(badge, id).then((data) => {
			return data;
		});
	}

	/**
	 *
	 * @param id
	 * @returns
	 */
	async delete(id: number): Promise<boolean | number> {
		return this.badgeRepository
			.delete(id)
			.then((data: boolean | number) => {
				return data;
			});
	}
}
