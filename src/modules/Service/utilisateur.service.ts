import { UserDto } from "../Dto/utilisateur.dto";
import { IRepository } from "../core/repository.interface";
import { User } from "../Models/utilisateur.model";
import { IService } from "../core/service.interface";
import { Badge } from "../Models/badge.model";

export class UserService implements IService<UserDto> {
    private userRepository: IRepository<UserDto>;

    constructor(userRepository: IRepository<UserDto>) {
        this.userRepository = userRepository;
    }

    /**
     *
     * @param options
     * @returns
     */
    async findAll(options?: any): Promise<Array<UserDto> | null> {
        return this.userRepository.findAll(options).then((data) => {
            data.forEach((user) => {
                const birthdateObj = new Date(user.birthdate);
                const today = new Date();
                const diff = today.getTime() - birthdateObj.getTime();
                const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
                console.log(`âge de ${user.pseudo}: ${age} ans`);
                user.age = age;
            });
            return data;
        });
    }

    /**
     *
     * @param id
     * @returns
     */
    async findById(id_td_user: number): Promise<UserDto | null> {
        return this.userRepository.findById(id_td_user).then((data) => {
            console.log(data);
            return data;
        });
    }

    /**
     *
     * @param t
     * @returns
     */
    async create(user: User): Promise<UserDto | null> {
        const birthdate = new Date(user.birthdate);
        if (this.isAgeValid(birthdate)) {
            return this.userRepository.create(user).then((data) => {
                return data;
            });
        } else {
            return null; // L'âge n'est pas valide, renvoyer null ou lancer une exception appropriée.
        }
    }
    private isAgeValid(birthdate: Date): boolean {
        const currentDate = new Date();
        const ageDifference = currentDate.getFullYear() - birthdate.getFullYear();
        const isAgeValid = ageDifference >= 6;
        return isAgeValid;
    }

    /**
     *
     * @param user
     * @param idPseudo
     * @returns
     */
    async update(
        user: User,
        idPseudo: number,
        idBadge?: number
    ): Promise<boolean | number> {
        if (idBadge) {
            const badge = await Badge.findByPk(idBadge);
            if (!badge) {
                throw new Error("Badge not found");
            }

            const updatedUser = await User.update(user, {
                where: { id_pseudo: idPseudo },
            });
            if (updatedUser[0] !== 1) {
                return false;
            }

            const userInstance = await User.findByPk(idPseudo);
            if (!userInstance) {
                throw new Error("User not found");
            }

            await userInstance.addBadge(badge);

            return true;
        } else {
            return this.userRepository.update(user, idPseudo).then((data) => {
                return data;
            });
        }
    }

    /**
     *
     * @param id
     * @returns
     */
    async delete(id_td_user: number): Promise<boolean | number> {
        return this.userRepository
            .delete(id_td_user)
            .then((data: boolean | number) => {
                return data;
            });
    }
}
