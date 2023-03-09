import { IRepository } from "../core/repository.interface";
import { IService } from "../core/service.interface";
import { QcmDto } from "../Dto/qcm.dto";
import { QCM } from "../Models/qcm.model";

export class QcmService implements IService<QcmDto> {
	private qcmRepository: IRepository<QcmDto>;

	constructor(qcmRepository: IRepository<QcmDto>) {
		this.qcmRepository = qcmRepository;
	}

	/**
	 *
	 * @param options
	 * @returns
	 */
	async findAll(options?: any): Promise<Array<QcmDto> | null> {
		return this.qcmRepository.findAll(options).then((data) => {
			return data;
		});
	}

	/**
	 *
	 * @param id
	 * @returns
	 */
	async findById(id: number): Promise<QcmDto | null> {
		return this.qcmRepository.findById(id).then((data) => {
			console.log(data);
			return data;
		});
	}

	/**
	 *
	 * @param t
	 * @returns
	 */
	async create(qcm: QcmDto): Promise<QcmDto | null> {
		return this.qcmRepository.create(qcm).then((data) => {
			return data;
		});
	}

	/**
	 *
	 * @param t
	 * @returns
	 */
	async update(qcm: QcmDto, id: number): Promise<boolean | number> {
		return this.qcmRepository.update(qcm, id).then((data) => {
			return data;
		});
	}

	/**
	 *
	 * @param id
	 * @returns
	 */
	async delete(id: number): Promise<boolean | number> {
		return this.qcmRepository
			.delete(id)
			.then((data: boolean | number) => {
				return data;
			});
	}
}
