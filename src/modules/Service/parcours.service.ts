import sequelize from "~/Database/sequelize";
import { IRepository } from "../core/repository.interface";
import { IService } from "../core/service.interface";
import { ParcoursDto } from "../Dto/parcours.dto";;
import { Parcours } from "../Models/parcours.model";
import { ParcoursPoint } from "../Models/parcoursPoint.model";
import { ParcoursAnimation } from "../Models/parcoursAnimation.model";

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
 * @param parcours 
 * @returns 
 */
    async create(parcours: ParcoursDto): Promise<ParcoursDto | null> {
        let createdParcours: ParcoursDto | null = null;
		const transaction = await sequelize.transaction();
		
        try {
            createdParcours = await Parcours.create({name: parcours.name,},{ transaction });
			if (parcours.animations && parcours.animations.length > 0) {
				const animationIds = parcours.animations.map((anim: any) => anim.idAnimation);
				await ParcoursAnimation.bulkCreate(
					animationIds.map((animationId: number) => ({
						parcourIdParcours: createdParcours!.id_parcours,
						animationIdAnimation: animationId,
					})),
					{ transaction }
				);
			}
			
            if (parcours.points && parcours.points.length > 0) {
                const pointIds = parcours.points.map(
                    (point: any) => point.id_point
                );
                await ParcoursPoint.bulkCreate(
                    pointIds.map((pointId: number) => ({
                        parcourIdParcours: createdParcours!.id_parcours,
                        pointIdPoint: pointId,
                    })),
                    { transaction }
                );
            }

            await transaction.commit();
        } catch (error) {
			await transaction.rollback();
			console.error(error);
        }

        return createdParcours;
    }

    /**
     *
     * @param t
     * @returns
     */
    async update(parcours: ParcoursDto, id: number): Promise<boolean | number> {
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
