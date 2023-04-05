import { QcmDto } from "./qcm.dto";
import { SimpleQuestionDto } from "./simpleQuestion.dto";

export interface AnimationDto {
	idAnimation: number;

	name: string;

	id_point: number;

	Point: string;

	SimpleQuestions?: SimpleQuestionDto[];

	QCMs?: QcmDto[];
}