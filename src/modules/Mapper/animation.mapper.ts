import { AnimationDto } from "../Dto/animation.dto";
import { ParcoursDto } from "../Dto/parcours.dto";
import { QcmDto } from "../Dto/qcm.dto";
import { SimpleQuestionDto } from "../Dto/simpleQuestion.dto";
import { Animation } from "../Models/animation.model";
import { Parcours } from "../Models/parcours.model";
import { QCM } from "../Models/qcm.model";
import { SimpleQuestion } from "../Models/simpleQuestion.model";

export class AnimationMapper {
	static MapToDto(animation: Animation | null): AnimationDto {
		if (animation === null) return null as any;

		let QCMs: QCM[] = animation.get({ plain: true }).qcms;
		
		const QCMsData = QCMs.map((qcm) => {
			const QcmDto: QcmDto = {
				id_qcm: qcm.id_qcm,
				question: qcm.question,
				correctResponse: qcm.correct_response,
				optionA: qcm.optiona,
				optionB: qcm.optionb,
				optionC: qcm.optionc,
				optionD: qcm.optiond
			};
			return QcmDto;
		});
		
		let SimpleQuestions: SimpleQuestion[] = animation.get({ plain: true }).simple_questions;
		
		const SimpleQuestionsData = SimpleQuestions.map((simpleQuestion) => {
			const SimpleQuestionDto: SimpleQuestionDto = {
				id_simple_question: simpleQuestion.id_simple_question,
				question: simpleQuestion.question,
				response: simpleQuestion.response
			};
			return SimpleQuestionDto;
		});

		const Dto: AnimationDto = {
			idAnimation: animation.id_animation,
			name: animation.name,
			QCMs: QCMsData,
			SimpleQuestions: SimpleQuestionsData,
		};
		return Dto;
	}
}