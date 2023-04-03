import { PointDto } from "./points.dto";

export interface ParcoursDto {
	id_parcours: number;
	name: string;
	points?: PointDto[];
}