import { AnimationDto } from "./animation.dto";
import { BadgeDto } from "./badge.dto";
import { PointDto } from "./points.dto";

export interface ParcoursDto {
	id_parcours: number;
	name: string;
	points?: PointDto[];
	animation?: AnimationDto;
	badge?: BadgeDto;
}