import { AnimationDto } from "../Dto/animation.dto";
import { Animation } from "../Models/animation.model";

export class AnimationMapper {
	static MapToDto(animation: Animation | null): AnimationDto {
		if (animation === null) return null as any;

		const Dto: AnimationDto = {
            name: animation.name
        };
		return Dto;
	}
}