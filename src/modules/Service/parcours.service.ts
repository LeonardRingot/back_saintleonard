import sequelize from "~/Database/sequelize";
import { IRepository } from "../core/repository.interface";
import { IService } from "../core/service.interface";
import { ParcoursDto } from "../Dto/parcours.dto";;
import { Parcours } from "../Models/parcours.model";
import { ParcoursPoint } from "../Models/parcoursPoint.model";

import { Op } from 'sequelize';

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
            createdParcours = await Parcours.create({
                name: parcours.name,
                id_animation: parcours.animation ? parcours.animation.id_animation : null,
            },{ transaction });

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
    async update(parcours: ParcoursDto, id_parcours: number): Promise<boolean | number> {
        const t = await sequelize.transaction();
        try {
            // Récupérer le parcours actuel de la base de données
            const currentParcours = await this.parcoursRepository.findById(id_parcours);
    
            if (!currentParcours) {
                throw new Error('Parcours introuvable');
            }

            await Parcours.update(
                { 
                    name: parcours.name,
                    id_animation: parcours.animation ? parcours.animation.id_animation : null,
                },
                { where: { id_parcours: id_parcours }, transaction: t }
            );

            // Gérer les points du parcours
            const currentPoints = currentParcours.points;
    
            // Identifier les points à supprimer
            const pointsToDelete = currentPoints?.filter((point: any) =>
                parcours.points && !parcours.points.some((a: any) => a.idPoint === point.idPoint)
            ) || [];
    
            // Identifier les nouvelles points à ajouter
            const pointsToAdd = parcours.points?.filter((point: any) => 
                currentPoints && !currentPoints.some((a: any) => a.idPoint === point.idPoint)
            );
    
            // Supprimer les points du parcours qui ne sont plus présentes
            if (pointsToDelete.length > 0) {
                const pointIdsToDelete = pointsToDelete.map((point: any) => point.idPoint);
                await ParcoursPoint.destroy({
                    where: {
                        parcourIdParcours: id_parcours,
                        pointIdPoint: {
                            [Op.in]: pointIdsToDelete
                        } as any
                    },
                    transaction: t
                });
            }
    
            // Ajouter les nouvelles points au parcours
            if (pointsToAdd && pointsToAdd.length > 0) {
                const pointIdsToAdd = pointsToAdd.map((point: any) => point.idPoint);
                await ParcoursPoint.bulkCreate(
                    pointIdsToAdd.map((pointId: number) => ({
                        parcourIdParcours: id_parcours,
                        pointIdPoint: pointId,
                        // positionParcours: position,
                    })),
                    { transaction: t }
                );
            }
    
            await t.commit();
            return true;
        } catch (error) {
            await t.rollback();
            console.log(error);
            return false;
        }
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
