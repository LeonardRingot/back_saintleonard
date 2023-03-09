import { IRepository } from "../core/repository.interface";
import { NotFoundError } from "../core/errors/errors";
import { PointDto } from "../Dto/points.dto";
import { Point } from "../Models/points.model";
import { PointMapper } from "../Mapper/points.mapper";

export class PointRepository implements IRepository<PointDto> {

	/**
	 *
	 * @param id
	 * @returns
	 */
	async findById(id: number): Promise<PointDto | null> {
		const result = await Point.findByPk(id);
		if (result === null) throw new NotFoundError("Point not found");
		return PointMapper.MapToDto(result);
	}

	/**
	 *
	 * @param filter
	 * @returns
	 */
	async findAll(filter: any): Promise<Array<PointDto>> {
		return Point.findAll({
			where: filter,
		}).then((data: Array<Point>) => {
			return data.map((point: Point) => {
				return PointMapper.MapToDto(point);
			});
		});
	}

	/**
	 *
	 * @param point
	 */
	async create(point: Partial<PointDto>): Promise<PointDto> {
		return Point.create(point).then((data: Point) => {
			return PointMapper.MapToDto(data);
		});
	}

	/**
	 *
	 * @param point
	 */
	async update(point: PointDto, id: number): Promise<boolean | number> {
		return Point.update(point, { where: { id_point: id } }).then(
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
		return Point.destroy({ where: { id_point: id } }).then(
			(data: boolean | number) => {
				return data;
			}
		);
	}
}