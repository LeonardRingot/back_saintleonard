import { IRepository } from "../core/repository.interface";
import { IService } from "../core/service.interface";
import { PointDto } from "../Dto/points.dto";
import { Point } from "../Models/points.model";

export class PointService implements IService<PointDto> {
	private pointRepository: IRepository<PointDto>;

	constructor(pointRepository: IRepository<PointDto>) {
		this.pointRepository = pointRepository;
	}

	/**
	 *
	 * @param options
	 * @returns
	 */
	async findAll(options?: any): Promise<Array<PointDto> | null> {
		return this.pointRepository.findAll(options).then((data) => {
			return data;
		});
	}

	/**
	 *
	 * @param id
	 * @returns
	 */
	async findById(id: number): Promise<PointDto | null> {
		return this.pointRepository.findById(id).then((data) => {
			console.log(data);
			return data;
		});
	}

	/**
	 *
	 * @param t
	 * @returns
	 */
	async create(point: PointDto): Promise<PointDto | null> {
		return this.pointRepository.create(point).then((data) => {
			return data;
		});
	}

	/**
	 *
	 * @param t
	 * @returns
	 */
	async update(point: PointDto, id: number): Promise<boolean | number> {
		return this.pointRepository.update(point, id).then((data) => {
			return data;
		});
	}

	/**
	 *
	 * @param id
	 * @returns
	 */
	async delete(id: number): Promise<boolean | number> {
		return this.pointRepository
			.delete(id)
			.then((data: boolean | number) => {
				return data;
			});
	}
}
