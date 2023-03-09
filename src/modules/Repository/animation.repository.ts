import { IRepository } from "../core/repository.interface";
import { NotFoundError } from "../core/errors/errors";
import { AnimationDto } from "../Dto/animation.dto";
import { Animation } from "../Models/animation.model";
import { AnimationMapper } from "../Mapper/animation.mapper";

export class AnimationRepository implements IRepository<AnimationDto> {

	/**
	 *
	 * @param id
	 * @returns
	 */
	async findById(id: number): Promise<AnimationDto | null> {
		const result = await Animation.findByPk(id);
		if (result === null) throw new NotFoundError("Animation not found");
		return AnimationMapper.MapToDto(result);
	}

	/**
	 *
	 * @param filter
	 * @returns
	 */
	async findAll(filter: any): Promise<Array<AnimationDto>> {
		return Animation.findAll({
			where: filter,
		}).then((data: Array<Animation>) => {
			return data.map((animation: Animation) => {
				return AnimationMapper.MapToDto(animation);
			});
		});
	}

	/**
	 *
	 * @param animation
	 */
	async create(animation: Partial<AnimationDto>): Promise<AnimationDto> {
		return Animation.create(animation).then((data: Animation) => {
			return AnimationMapper.MapToDto(data);
		});
	}

	/**
	 *
	 * @param animation
	 */
	async update(animation: Animation, id: number): Promise<boolean | number> {
		return Animation.update(animation, { where: { id_animation: id } }).then(
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
		return Animation.destroy({ where: { id_animation: id } }).then(
			(data: boolean | number) => {
				return data;
			}
		);
	}
}