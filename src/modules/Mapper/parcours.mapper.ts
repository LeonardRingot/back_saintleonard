import { ParcoursDto } from "../Dto/parcours.dto";
import { Parcours } from "../Models/parcours.model";

export class ParcoursMapper {
	static MapToDto(parcours: Parcours | null): ParcoursDto {
		if (parcours === null) return null as any;

		const Dto: ParcoursDto = {
        name: parcours.name
        };
		return Dto;
	}
}