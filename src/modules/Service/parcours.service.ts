import { IRepository } from "../core/repository.interface";
import { IService } from "../core/service.interface";
import { ParcoursDto } from "../Dto/parcours.dto";
import { PointDto } from "../Dto/points.dto";
import { Parcours } from "../Models/parcours.model";
import { ParcoursPoint } from "../Models/parcoursPoint.model";
import { PointRepository } from "../Repository/point.repository";

export class ParcoursService implements IService<ParcoursDto> {
	private parcoursRepository: IRepository<ParcoursDto>;
	private pointRepository: IRepository<PointDto>;

	constructor(parcoursRepository: IRepository<ParcoursDto>, pointRepository: IRepository<PointDto>) {
		this.parcoursRepository = parcoursRepository;
		this.pointRepository = pointRepository;
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
	async create(parcours: ParcoursDto): Promise<ParcoursDto | null> {
		if (parcours.animations && parcours.animations.length > 0) {
			const anims: any = parcours.animations;
			anims.forEach((anim:any ) => {
				const id_animation = anim.id;
				console.log("id_animation: " + id_animation);
			});
		} else {
			console.log("aucune animation");
		}
		if (parcours.points  && parcours.points.length > 0) {
			const points: any = parcours.points;
			points.forEach((point:any ) => {
				const id_point = point.id;
				console.log("id_point: " + id_point);
				this.pointRepository.findById(id_point).then(async (data) => {
					console.log(data);
					// Attention aux changements dans parcoursrepo et injection
					const pointduparcours = await ParcoursPoint.create({
                        parcourIdParcours: parcours.id_parcours,
                        pointIdPoint: id_point
                    });
				});
			});
		} else {
			console.log("aucun point");
		}
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
