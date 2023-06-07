import { SimpleQuestionDto } from "../Dto/simpleQuestion.dto";
import { SimpleQuestion } from "../Models/simpleQuestion.model";

export class SimpleQuestionMapper {
	static MapToDto(simpleQuestion: SimpleQuestion | null): SimpleQuestionDto {
		if (simpleQuestion === null) return null as any;

		const Dto: SimpleQuestionDto = {
            question: simpleQuestion.question,
            response: simpleQuestion.response
        };
		return Dto;
	}
}