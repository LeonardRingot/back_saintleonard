import { IRepository } from "../core/repository.interface";
import { NotFoundError } from "../core/errors/errors";
import { ParcoursDto } from "../Dto/parcours.dto";
import { Parcours } from "../Models/parcours.model";
import { ParcoursMapper } from "../Mapper/parcours.mapper";
import { Point } from "../Models/points.model";

export class ParcoursRepository implements IRepository<ParcoursDto> {

	/**
	 *
	 * @param id
	 * @returns
	 */
	async findById(id: number): Promise<ParcoursDto | null> {
		const result = await Parcours.findByPk(id);
		if (result === null) throw new NotFoundError("Parcours not found");
		return ParcoursMapper.MapToDto(result);
	}

	/**
	 *
	 * @param filter
	 * @returns
	 */
	async findAll(filter: any): Promise<Array<ParcoursDto>> {
		return Parcours.findAll({ include: Point ,
			where: filter,
		}).then((data: Array<Parcours>) => {
			return data.map((parcours: Parcours) => {
				return ParcoursMapper.MapToDto(parcours);
			});
		});
	}

	/**
	 *
	 * @param parcours
	 */
	async create(parcours: Partial<ParcoursDto>): Promise<ParcoursDto> {
		return Parcours.create(parcours).then((data: Parcours) => {
			return ParcoursMapper.MapToDto(data);
		});
	}

	/**
	 *
	 * @param parcours
	 */
	async update(parcours: Parcours, id: number): Promise<boolean | number> {
		return Parcours.update(parcours, { where: { id_parcours: id } }).then(
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
		return Parcours.destroy({ where: { id_parcours: id } }).then(
			(data: boolean | number) => {
				return data;
			}
		);
	}
}