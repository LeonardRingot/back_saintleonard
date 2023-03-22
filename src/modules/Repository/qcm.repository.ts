import { IRepository } from "../core/repository.interface";
import { NotFoundError } from "../core/errors/errors";
import { QcmDto } from "../Dto/qcm.dto";
import { QCM } from "../Models/qcm.model";
import { QcmMapper } from "../Mapper/qcm.mapper";

export class QcmRepository implements IRepository<QcmDto> {

	/**
	 *
	 * @param id
	 * @returns
	 */
	async findById(id: number): Promise<QcmDto | null> {
		const result = await QCM.findByPk(id);
		if (result === null) throw new NotFoundError("QCM not found");
		return QcmMapper.MapToDto(result);
	}

	/**
	 *
	 * @param filter
	 * @returns
	 */
	async findAll(filter: any): Promise<Array<QcmDto>> {
		return QCM.findAll({
			where: filter,
		}).then((data: Array<QCM>) => {
			return data.map((qcm: QCM) => {
				return QcmMapper.MapToDto(qcm);
			});
		});
	}

	/**
	 *
	 * @param qcm
	 */
	async create(qcm: Partial<QcmDto>): Promise<QcmDto> {
		return QCM.create(qcm).then((data: QCM) => {
			return QcmMapper.MapToDto(data);
		});
	}

	/**
	 *
	 * @param qcm
	 */
	async update(qcm: QcmDto, id: number): Promise<boolean | number> {
		return QCM.update(qcm, { where: { id_qcm: id } }).then(
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
		return QCM.destroy({ where: { id_qcm: id } }).then(
			(data: boolean | number) => {
				return data;
			}
		);
	}
}