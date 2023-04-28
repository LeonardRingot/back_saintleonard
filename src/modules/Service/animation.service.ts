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
    async update(
        animation: AnimationDto,
        id: number
    ): Promise<boolean | number> {
        return this.animationRepository.update(animation, id).then((data) => {
            return data;
        });
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
