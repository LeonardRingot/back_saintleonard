import { AnimationDto } from "../Dto/animation.dto";
import { QcmDto } from "../Dto/qcm.dto";
import { SimpleQuestionDto } from "../Dto/simpleQuestion.dto";
import { Animation } from "../Models/animation.model";
import { QCM } from "../Models/qcm.model";
import { SimpleQuestion } from "../Models/simpleQuestion.model";

export class AnimationMapper {
	static MapToDto(animation: Animation | null): AnimationDto {
		if (animation === null) return null as any;

		let QCMs: QCM[] = animation.get({ plain: true }).qcms;
		
		const QCMsData = QCMs.map((qcm) => {
			const QcmDto: QcmDto = {
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
				question: simpleQuestion.question,
				response: simpleQuestion.response
			};
			return SimpleQuestionDto;
		});

		const Dto: AnimationDto = {
			idAnimation: animation.id_animation,
			name: animation.name,
			id_point: animation.id_point,
			Point: animation.get({ plain: true }).point.name,
			QCMs: QCMsData,
			SimpleQuestions: SimpleQuestionsData,
		};
		return Dto;
	}
}