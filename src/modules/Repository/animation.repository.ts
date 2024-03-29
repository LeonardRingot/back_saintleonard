import { IRepository } from "../core/repository.interface";
import { NotFoundError } from "../core/errors/errors";
import { AnimationDto } from "../Dto/animation.dto";
import { Animation } from "../Models/animation.model";
import { AnimationMapper } from "../Mapper/animation.mapper";
import { QCM } from "../Models/qcm.model";
import { SimpleQuestion } from "../Models/simpleQuestion.model";
import { Parcours } from "../Models/parcours.model";

export class AnimationRepository implements IRepository<AnimationDto> {

	/**
	 *
	 * @param id
	 * @returns
	 */
	async findById(id: number): Promise<AnimationDto | null> {
		const result = await Animation.findByPk(id, { include: [QCM, SimpleQuestion]});
		if (result === null) throw new NotFoundError("Animation not found");
		return AnimationMapper.MapToDto(result);
	}

	/**
	 *
	 * @param filter
	 * @returns
	 */
	async findAll(filter: any): Promise<Array<AnimationDto>> {
		return Animation.findAll({ include: [QCM, SimpleQuestion],
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
	async update(animation: AnimationDto, id: number): Promise<boolean | number> {
		const whereClause = { id_animation: id };
		if (!id) {
			throw new Error("Invalid ID");
		}
		return Animation.update(animation, { where: whereClause }).then(
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