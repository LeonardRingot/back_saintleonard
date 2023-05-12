import sequelize from "~/Database/sequelize";
import { IRepository } from "../core/repository.interface";
import { IService } from "../core/service.interface";
import { AnimationDto } from "../Dto/animation.dto";
import { QcmDto } from "../Dto/qcm.dto";
import { SimpleQuestionDto } from "../Dto/simpleQuestion.dto";
import { Animation } from "../Models/animation.model";
import { SimpleQuestion } from "../Models/simpleQuestion.model";
import { QCM } from "../Models/qcm.model";

export class AnimationService implements IService<AnimationDto> {
    private animationRepository: IRepository<AnimationDto>;

    constructor(animationRepository: IRepository<AnimationDto>) {
        this.animationRepository = animationRepository;
    }

    /**
     *
     * @param options
     * @returns
     */
    async findAll(options?: any): Promise<Array<AnimationDto> | null> {
        return this.animationRepository.findAll(options).then((data) => {
            return data;
        });
    }

    /**
     *
     * @param id
     * @returns
     */
    async findById(id: number): Promise<AnimationDto | null> {
        return this.animationRepository.findById(id).then((data) => {
            console.log(data);
            return data;
        });
    }

    // async create(animation: AnimationDto): Promise<AnimationDto | null> {
    //     return this.animationRepository.create(animation).then((data) => {
    //         return data;
    //     });
    // }


    async create(animation: AnimationDto): Promise<AnimationDto | null> {
        const t = await sequelize.transaction();
        try {
			const { name, SimpleQuestions, QCMs } = animation;
            const newAnimation = await Animation.create(
                { name },
                { transaction: t }
            );

            if (SimpleQuestions && SimpleQuestions.length > 0) {
                const createdSQs = await Promise.all(
					SimpleQuestions.map(async (q) => {
						const createdSQ = await SimpleQuestion.create(
							{
								question: q.question,
								response: q.response,
								id_animation: newAnimation.id_animation,
							},
							{ transaction: t }
						);
						return createdSQ;
					})
				);
            }

            if (QCMs && QCMs.length > 0) {
                const createdQcms = await Promise.all(
                    QCMs.map(async (q) => {
                        const createdQcm = await QCM.create(
                            {
                                question: q.question,
                                correct_response: q.correctResponse,
                                optiona: q.optionA,
                                optionb: q.optionB,
                                optionc: q.optionC,
                                optiond: q.optionD,
                                id_animation: newAnimation.id_animation,
                            },
                            { transaction: t }
                        );
                        return createdQcm;
                    })
                );
            }

            await t.commit();
            return animation;
        } catch (err) {
            await t.rollback();
            console.error(err);
            throw new Error("Erreur lors de la création de l'animation");
        }
    }

    /**
     *
     * @param t
     * @returns
     */
    async update(animation: AnimationDto, id: number): Promise<boolean | number> {
        const t = await sequelize.transaction();
        try {
            const { name, SimpleQuestions, QCMs } = animation;
            const updatedAnimation = await Animation.update(
                { name },
                { where: { id_animation: id }, transaction: t }
            );
            if (SimpleQuestions && SimpleQuestions.length > 0) {
                await Promise.all(
                    SimpleQuestions.map(async (q) => {
                        const updateValues: any = {};
                        if (q.question) updateValues.question = q.question;
                        if (q.response) updateValues.response = q.response;
                        
                        if (q.id_simple_question) {
                            // Mise à jour de la question simple existante
                            const updatedSQ = await SimpleQuestion.update(
                                updateValues,
                                { where: { id_simple_question: q.id_simple_question, id_animation: id }, transaction: t }
                            );
                            return updatedSQ;
                        } else {
                            // Création d'une nouvelle question simple
                            updateValues.id_animation = id;
                            const createdSQ = await SimpleQuestion.create(updateValues, { transaction: t });
                            return createdSQ;
                        }
                    })
                );
            }
    
            if (QCMs && QCMs.length > 0) {
    await Promise.all(
        QCMs.map(async (q) => {
            const updateValues: any = {};
            if (q.question) updateValues.question = q.question;
            if (q.correctResponse) updateValues.correct_response = q.correctResponse;
            if (q.optionA) updateValues.optiona = q.optionA;
            if (q.optionB) updateValues.optionb = q.optionB;
            if (q.optionC) updateValues.optionc = q.optionC;
            if (q.optionD) updateValues.optiond = q.optionD;

            if (q.id_qcm) {
                // Mise à jour du QCM existant
                const existingQcm = await QCM.findOne({
                    where: { id_qcm: q.id_qcm, id_animation: id },
                });

                if (existingQcm) {
                    // QCM existant trouvé, mettre à jour les valeurs
                    const updatedQcm = await existingQcm.update(updateValues, { transaction: t });
                    return updatedQcm;
                }
            }

            // Aucun QCM existant trouvé ou aucun ID spécifié, créer un nouveau QCM
            updateValues.id_animation = id;
            const createdQcm = await QCM.create(updateValues, { transaction: t });
            return createdQcm;
        })
    );
            }
    
            await t.commit();
            return updatedAnimation[0] === 1;
        } catch (err) {
            await t.rollback();
            console.error(err);
            throw new Error("Erreur lors de la mise à jour de l'animation");
        }
    }

    /**
     *
     * @param id
     * @returns
     */
    async delete(id: number): Promise<boolean | number> {
        return this.animationRepository
            .delete(id)
            .then((data: boolean | number) => {
                return data;
            });
    }
}
