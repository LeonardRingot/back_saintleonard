import { IRepository } from "../core/repository.interface";
import { IService } from "../core/service.interface";
import { ParcoursDto } from "../Dto/parcours.dto";
import { Parcours } from "../Models/parcours.model";

export class ParcoursService implements IService<ParcoursDto> {
	private parcoursRepository: IRepository<ParcoursDto>;

	constructor(parcoursRepository: IRepository<ParcoursDto>) {
		this.parcoursRepository = parcoursRepository;
	}

	/**
	 *
	 * @param options
	 * @returns
	 */
	async findAll(options?: any): Promise<Array<ParcoursDto> | null> {
		return this.parcoursRepository.findAll(options).then((data) => {
			return data;
		});
	}

	/**
	 *
	 * @param id
	 * @returns
	 */
	async findById(id: number): Promise<ParcoursDto | null> {
		return this.parcoursRepository.findById(id).then((data) => {
			console.log(data);
			return data;
		});
	}

	/**
	 *
	 * @param t
	 * @returns
	 */
	async create(parcours: Parcours): Promise<ParcoursDto | null> {
		return this.parcoursRepository.create(parcours).then((data) => {
			return data;
		});
	}

	/**
	 *
	 * @param t
	 * @returns
	 */
	async update(parcours: Parcours, id: number): Promise<boolean | number> {
		return this.parcoursRepository.update(parcours, id).then((data) => {
			return data;
		});
	}

	/**
	 *
	 * @param id
	 * @returns
	 */
	async delete(id: number): Promise<boolean | number> {
		return this.parcoursRepository
			.delete(id)
			.then((data: boolean | number) => {
				return data;
			});
	}
}
