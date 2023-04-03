import { PointDto } from "./points.dto";

export interface ParcoursDto {
	name: string;
	points?: PointDto[];
}