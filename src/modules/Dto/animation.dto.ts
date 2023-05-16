import { ParcoursDto } from "./parcours.dto";
import { QcmDto } from "./qcm.dto";
import { SimpleQuestionDto } from "./simpleQuestion.dto";

export interface AnimationDto {
	id_animation: number;

	name: string;

	SimpleQuestions?: SimpleQuestionDto[];

	QCMs?: QcmDto[];
}