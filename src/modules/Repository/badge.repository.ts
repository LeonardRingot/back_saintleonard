import { IRepository } from "../core/repository.interface";
import { NotFoundError } from "../core/errors/errors";
import { BadgeDto } from "../Dto/badge.dto";
import { Badge } from "../Models/badge.model";
import { BadgeMapper } from "../Mapper/badge.mapper";

export class BadgeRepository implements IRepository<BadgeDto> {

	/**
	 *
	 * @param id
	 * @returns
	 */
	async findById(id: number): Promise<BadgeDto | null> {
		const result = await Badge.findByPk(id);
		if (result === null) throw new NotFoundError("Badge not found");
		return BadgeMapper.MapToDto(result);
	}

	/**
	 *
	 * @param filter
	 * @returns
	 */
	async findAll(filter: any): Promise<Array<BadgeDto>> {
		return Badge.findAll({
			where: filter,
		}).then((data: Array<Badge>) => {
			return data.map((badge: Badge) => {
				return BadgeMapper.MapToDto(badge);
			});
		});
	}

	/**
	 *
	 * @param badge
	 */
	async create(badge: Partial<BadgeDto>): Promise<BadgeDto> {
		return Badge.create(badge).then((data: Badge) => {
			return BadgeMapper.MapToDto(data);
		});
	}

	/**
	 *
	 * @param badge
	 */
	async update(badge: Badge, id: number): Promise<boolean | number> {
		return Badge.update(badge, { where: { id_badge: id } }).then(
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
		return Badge.destroy({ where: { id_badge: id } }).then(
			(data: boolean | number) => {
				return data;
			}
		);
	}
}