import { PointDto } from "../Dto/points.dto";
import { Point } from "../Models/points.model";

export class PointMapper {
	static MapToDto(point: Point | null): PointDto {
		if (point === null) return null as any;

		const Dto: PointDto = {
			id_point: point.id_point,
			name: point.name,
			smallDescription: point.small_description,
			mainDescription: point.main_description,
			lat: point.lat,
			lon: point.lon,
			QrCode: point.qrcode
		};
		return Dto;
	}
}