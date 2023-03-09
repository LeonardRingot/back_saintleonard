import { QcmDto } from "../Dto/qcm.dto";
import { QCM } from "../Models/qcm.model";

export class QcmMapper {
	static MapToDto(qcm: QCM | null): QcmDto {
		if (qcm === null) return null as any;

		const Dto: QcmDto = {
			question: qcm.question,
			correctResponse: qcm.correct_response,
			optionA: qcm.optiona,
			optionB: qcm.optionb,
			optionC: qcm.optionc,
			optionD: qcm.optiond
		};
		return Dto;
	}
}