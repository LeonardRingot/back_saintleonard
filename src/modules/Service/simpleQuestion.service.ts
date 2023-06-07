import { IRepository } from "../core/repository.interface";
import { IService } from "../core/service.interface";
import { SimpleQuestionDto } from "../Dto/simpleQuestion.dto";
import { SimpleQuestion } from "../Models/simpleQuestion.model";

export class SimpleQuestionService implements IService<SimpleQuestionDto> {
	private simpleQuestionRepository: IRepository<SimpleQuestionDto>;

	constructor(simpleQuestionRepository: IRepository<SimpleQuestionDto>) {
		this.simpleQuestionRepository = simpleQuestionRepository;
	}

	/**
	 *
	 * @param options
	 * @returns
	 */
	async findAll(options?: any): Promise<Array<SimpleQuestionDto> | null> {
		return this.simpleQuestionRepository.findAll(options).then((data) => {
			return data;
		});
	}

	/**
	 *
	 * @param id
	 * @returns
	 */
	async findById(id: number): Promise<SimpleQuestionDto | null> {
		return this.simpleQuestionRepository.findById(id).then((data) => {
			console.log(data);
			return data;
		});
	}

	/**
	 *
	 * @param t
	 * @returns
	 */
	async create(simpleQuestion: SimpleQuestion): Promise<SimpleQuestionDto | null> {
		return this.simpleQuestionRepository.create(simpleQuestion).then((data) => {
			return data;
		});
	}

	/**
	 *
	 * @param t
	 * @returns
	 */
	async update(simpleQuestion: SimpleQuestion, id: number): Promise<boolean | number> {
		return this.simpleQuestionRepository.update(simpleQuestion, id).then((data) => {
			return data;
		});
	}

	/**
	 *
	 * @param id
	 * @returns
	 */
	async delete(id: number): Promise<boolean | number> {
		return this.simpleQuestionRepository
			.delete(id)
			.then((data: boolean | number) => {
				return data;
			});
	}
}
