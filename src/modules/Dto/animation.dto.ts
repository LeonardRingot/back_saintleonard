import { ParcoursDto } from "./parcours.dto";
import { QcmDto } from "./qcm.dto";
import { SimpleQuestionDto } from "./simpleQuestion.dto";

export interface AnimationDto {
	idAnimation: number;

	name: string;

	SimpleQuestions?: SimpleQuestionDto[];

	QCMs?: QcmDto[];
}