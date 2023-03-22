import { IRepository } from "../core/repository.interface";
import { NotFoundError } from "../core/errors/errors";
import { SimpleQuestionDto } from "../Dto/simpleQuestion.dto";
import { SimpleQuestion } from "../Models/simpleQuestion.model";
import { SimpleQuestionMapper } from "../Mapper/simpleQuestion.mapper";

export class SimpleQuestionRepository implements IRepository<SimpleQuestionDto> {

	/**
	 *
	 * @param id
	 * @returns
	 */
	async findById(id: number): Promise<SimpleQuestionDto | null> {
		const result = await SimpleQuestion.findByPk(id);
		if (result === null) throw new NotFoundError("Simple Question not found");
		return SimpleQuestionMapper.MapToDto(result);
	}

	/**
	 *
	 * @param filter
	 * @returns
	 */
	async findAll(filter: any): Promise<Array<SimpleQuestionDto>> {
		return SimpleQuestion.findAll({
			where: filter,
		}).then((data: Array<SimpleQuestion>) => {
			return data.map((simpleQuestion: SimpleQuestion) => {
				return SimpleQuestionMapper.MapToDto(simpleQuestion);
			});
		});
	}

	/**
	 *
	 * @param simpleQuestion
	 */
	async create(simpleQuestion: Partial<SimpleQuestionDto>): Promise<SimpleQuestionDto> {
		return SimpleQuestion.create(simpleQuestion).then((data: SimpleQuestion) => {
			return SimpleQuestionMapper.MapToDto(data);
		});
	}

	/**
	 *
	 * @param simpleQuestion
	 */
	async update(simpleQuestion: SimpleQuestion, id: number): Promise<boolean | number> {
		return SimpleQuestion.update(simpleQuestion, { where: { id_simple_question: id } }).then(
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
		return SimpleQuestion.destroy({ where: { id_simple_question: id } }).then(
			(data: boolean | number) => {
				return data;
			}
		);
	}
}