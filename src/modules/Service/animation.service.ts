import { IRepository } from "../core/repository.interface";
import { IService } from "../core/service.interface";
import { AnimationDto } from "../Dto/animation.dto";


export class AnimationService implements IService<AnimationDto> {
	private animationRepository: IRepository<AnimationDto>;

	constructor(animationRepository: IRepository<AnimationDto>) {
		this.animationRepository = animationRepository;
	}

	/**
	 *
	 * @param options
	 * @returns
	 */
	async findAll(options?: any): Promise<Array<AnimationDto> | null> {
		return this.animationRepository.findAll(options).then((data) => {
			return data;
		});
	}

	/**
	 *
	 * @param id
	 * @returns
	 */
	async findById(id: number): Promise<AnimationDto | null> {
		return this.animationRepository.findById(id).then((data) => {
			console.log(data);
			return data;
		});
	}

	/**
	 *
	 * @param t
	 * @returns
	 */
	async create(animation: AnimationDto): Promise<AnimationDto | null> {
		return this.animationRepository.create(animation).then((data) => {
			return data;
		});
	}

	/**
	 *
	 * @param t
	 * @returns
	 */
	async update(animation: AnimationDto, id: number): Promise<boolean | number> {
		return this.animationRepository.update(animation, id).then((data) => {
			return data;
		});
	}

	/**
	 *
	 * @param id
	 * @returns
	 */
	async delete(id: number): Promise<boolean | number> {
		return this.animationRepository
			.delete(id)
			.then((data: boolean | number) => {
				return data;
			});
	}
}
