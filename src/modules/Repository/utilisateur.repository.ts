import { FullUserDto, UserDto } from "../Dto/utilisateur.dto";
import { User } from "../Models/utilisateur.model";
import { UserMapper } from "../Mapper/utilisateur.mapper";
import { IRepositoryUser } from "../core/repository.interface";
import { NotFoundError } from "../core/errors/errors";
import { Badge } from "../Models/badge.model";

export class UserRepository implements IRepositoryUser<FullUserDto, UserDto> {
    /**
     *
     * @param pseudo
     * @returns
     */
    async findByPseudo(pseudo: string): Promise<FullUserDto | null> {
        const user = await User.scope("withPassword").findOne({
            where: {
                pseudo: pseudo,
            },
        });
        if (!user) {
            return null;
        }
        return UserMapper.MapFullToDto(user);
    }

    /**
     *
     * @param id
     * @returns
     */
    async findById(id: number): Promise<UserDto | null> {
        const result = await User.findByPk(id, { include: Badge });
        if (result === null) throw new NotFoundError("User not found");
        return UserMapper.MapToDto(result);
    }

    /**
     *
     * @param filter
     * @returns
     */
    async findAll(filter: any): Promise<Array<UserDto>> {
        return User.findAll({ include: Badge, where: filter }).then(
            (data: Array<User>) => {
                return data.map((user: User) => {
                    return UserMapper.MapToDto(user);
                });
            }
        );
    }

    /**
     *
     * @param user
     */
    async create(user: Partial<UserDto>): Promise<UserDto> {
        return User.create(user).then((data: User) => {
            return UserMapper.MapToDto(data);
        });
    }

	/**
     * 
     * @param user 
     * @param id 
     * @returns 
     */
	async update(user: User, id: number): Promise<boolean | number> {
		return User.update(user, { where: { id_pseudo: id } }).then(
			(data: Array<boolean | number>) => {
				return data[0];
			}
		);
	}

    /**
     *
     * @param id
     */
    async delete(id: number): Promise<boolean | number> {
        return User.destroy({ where: { id_pseudo: id } }).then(
            (data: boolean | number) => {
                return data;
            }
        );
    }
}
