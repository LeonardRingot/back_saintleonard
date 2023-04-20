import { AnimationDto } from "../Dto/animation.dto";
import { ParcoursDto } from "../Dto/parcours.dto";
import { PointDto } from "../Dto/points.dto";
import { Animation } from "../Models/animation.model";
import { Parcours } from "../Models/parcours.model";
import { Point } from "../Models/points.model";

export class ParcoursMapper {
	static MapToDto(parcours: Parcours | null): ParcoursDto {
		if (parcours === null) return null as any;

		let animations: Animation[] = parcours.get({ plain: true }).animations;
		
		const animationsData = animations.map((animation) => {
			const animationDto: AnimationDto = {
				idAnimation: animation.id_animation,
				name: animation.name,
			};
			return animationDto;
		});

		let points: Point[] = parcours.get({ plain: true }).points;
		
		const pointsData = points.map((point) => {
			const pointDto: PointDto = {
				id_point: point.id_point,
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
			id_parcours: parcours.id_parcours,
			name: parcours.name,
			badge: parcours.get({ plain: true }).badge,
			points: pointsData,
			animations: animationsData,
		};
		return Dto;
	}
}