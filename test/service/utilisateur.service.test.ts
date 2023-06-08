import { IService } from "../../src/modules/core/service.interface";
import { IRepository } from "../../src/modules/core/repository.interface";
import { FullUserDto } from "../../src/modules/Dto/user.dto";
import { User } from "../../src/modules/Models/utilisateur.model";
import { UserService } from "../../src/modules/Service/utilisateur.service";
import sequelize from "../../src/Database/sequelize";
describe('database connection', () => {
    it('should connect to the database', async () => {
      expect.assertions(1);
      try {
        await sequelize.authenticate();
        console.log('Link established');
        expect(true).toBeTruthy();
      } catch (error) {
        console.error(`Error: ${error}`);
        expect(false).toBeTruthy();
      }
    });
  });

describe('UserService', () => {
    let userService: UserService;
    let userRepository: IRepository<FullUserDto>;
  
    beforeEach(() => {
        userRepository = {
        findAll: jest.fn(),
        findById: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      };
  
      userService = new UserService(userRepository);

      
    });
    describe('findAll', () => {
        it('should return an array of users', async () => {
            const expecteduser: FullUserDto[] = [
              { id_pseudo:1,pseudo: "toto",birthdate:"20/06/2000", city:"Menneville", zip_code:"62240", email:"toto@gmail.com", password:"mot de passe", is_admin:true},
              {id_pseudo:2,pseudo: "titi",birthdate:"21/06/2000", city:"Menneville", zip_code:"62241", email:"titi@gmail.com", password:"1234", is_admin:false },
            ];
          
            jest.spyOn(userRepository, 'findAll').mockResolvedValue(expecteduser);
          
            const result = await userRepository.findAll(undefined); 
          
            console.log('Expected User:', expecteduser);
            console.log('Actual Result:', result);
          
            expect(result).toEqual(expecteduser);
            expect(userRepository.findAll).toHaveBeenCalledWith(undefined);
          });
  
          it('should return an empty array if no badge found', async () => {
            jest.spyOn(userRepository, 'findAll').mockResolvedValue([]);
          
            const result = await userService.findAll();
          
            console.log('Expected Empty Array: []');
            console.log('Actual Result:', result);
          
            expect(result).toEqual([]);
            expect(userRepository.findAll).toHaveBeenCalledWith(undefined);
          });
  
      it('should pass the options parameter to the repository', async () => {
        const options = { someOption: 'value' };
  
        jest.spyOn(userRepository, 'findAll').mockResolvedValue([]);
  
        await userRepository.findAll(options);
  
        expect(userRepository.findAll).toHaveBeenCalledWith(options);
      });
    });
    describe('findById', () => {
        it('should return an user by its id', async () => {
          const id = 1;
          const expecteduser: FullUserDto = { id_pseudo: id,pseudo: "toto",birthdate:"20/06/2000", city:"Menneville", zip_code:"62240", email:"toto@gmail.com", password:"mot de passe", is_admin:true};
          jest.spyOn(userRepository, 'findById').mockResolvedValue(expecteduser);
    
          const result = await userService.findById(id);
    
          expect(result).toEqual(expecteduser);
          expect(userRepository.findById).toHaveBeenCalledWith(id);
        });
    
        it('should return null if no parcours found', async () => {
          const id = 2;
          jest.spyOn(userRepository, 'findById').mockResolvedValue(null);
    
          const result = await userService.findById(id);
    
          expect(result).toBeNull();
          expect(userRepository.findById).toHaveBeenCalledWith(id);
        });
      });
});