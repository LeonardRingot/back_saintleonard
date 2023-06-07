import { BadgeDto } from "../Dto/badge.dto";
import { Badge } from "../Models/badge.model";

export class BadgeMapper {
	static MapToDto(badge: Badge | null): BadgeDto {
		if (badge === null) return null as any;

		const Dto: BadgeDto = {
			id_badge: badge.id_badge,
			name: badge.name,
			image: badge.image,
		};
		return Dto;
	}
}