import { ParcoursDto } from "../Dto/parcours.dto";
import { PointDto } from "../Dto/points.dto";
import { Parcours } from "../Models/parcours.model";
import { Point } from "../Models/points.model";

export class ParcoursMapper {
	static MapToDto(parcours: Parcours | null): ParcoursDto {
		if (parcours === null) return null as any;

		let points: Point[] = parcours.get({ plain: true }).points;

		const pointsData = points.map((point) => {
			const pointDto: PointDto = {
				name: point.name,
				smallDescription: point.small_description,
				mainDescription: point.main_description,
				lat: point.lat,
				lon: point.lon,
				QrCode: point.qrcode
			};
			return pointDto;
		});

		const Dto: ParcoursDto = {
        name: parcours.name,
		points: pointsData,
        };
		return Dto;
	}
}