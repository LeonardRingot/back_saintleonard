import { FullUserDto } from "../../src/modules/Dto/utilisateur.dto";
import { UserRepository } from "../../src/modules/Repository/utilisateur.repository"
import sequelize from "../../src/Database/sequelize";
import { User } from "../../src/modules/Models/utilisateur.model";

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
  describe('UserRepository', () => {
    let userRepository: UserRepository;
  
    beforeEach(() => {
        userRepository = new UserRepository();
    });
  
    describe('findById', () => {
        it('should return a PointDto if the point is found', async () => {
            const id = 1;
            const expected: FullUserDto = { 
                id_pseudo:1,
                pseudo: "toto",
                birthdate:"20/06/2000",
                 city:"Menneville",
                  zip_code:"62240", 
                  email:"toto@gmail.com",
                   password:"mot de passe",
                    is_admin:true
                };
      
            // Mock la méthode Point.findByPk pour renvoyer la valeur attendue
            User.findByPk = jest.fn().mockResolvedValue(expected);
      
            // Appelez la méthode findById du repository
            const result = await userRepository.findById(id);
      
            // Vérifiez les résultats
            expect(result).toEqual(expected);
            expect(User.findByPk).toHaveBeenCalledTimes(1);
            expect(User.findByPk).toBeCalledWith(id);
          });
  
    });
  
    describe('findAll', () => {
        it('should return an array of PointDto', async () => {
          const filter = {};
    
          // Définissez ici les valeurs attendues pour les points retournés
          const expectedPoints: FullUserDto[] = [];
    
          // Mock la méthode Point.findAll pour renvoyer les valeurs attendues
          User.findAll = jest.fn().mockResolvedValue(expectedPoints);
    
          // Appelez la méthode findAll du repository
          const result = await userRepository.findAll(filter);
    
          // Vérifiez les résultats
          expect(result).toEqual(expectedPoints);
          expect(User.findAll).toHaveBeenCalledTimes(1);
          expect(User.findAll).toBeCalledWith({ where: filter });
        });
      });
  
    describe('create', () => {
        it('should create a new Point and return the created PointDto', async () => {
          const qcmData: Partial<FullUserDto> = {
            pseudo: "toto",
                birthdate:"20/06/2000",
                 city:"Menneville",
                  zip_code:"62240", 
                  email:"toto@gmail.com",
                   password:"mot de passe",
                    is_admin:true
          };
          const createdQcm: FullUserDto = {
            id_pseudo:2,
            pseudo: "toto",
            birthdate:"20/06/2000",
             city:"Menneville",
              zip_code:"62240", 
              email:"toto@gmail.com",
               password:"mot de passe",
                is_admin:true
          };
    
          User.create = jest.fn().mockResolvedValue(createdQcm);
    
          const result = await User.create(qcmData);
    
          expect(result).toEqual(createdQcm);
          expect(User.create).toHaveBeenCalledTimes(1);
          expect(User.create).toBeCalledWith(qcmData);
        });
    });
  
    // describe('update', () => {
    //   it('should update the point and return true', async () => {
    //     const pointData: FullUserDto = {
    //         id_pseudo:1,
    //         pseudo: "toto",
    //         birthdate:"20/06/2000",
    //          city:"Menneville",
    //           zip_code:"62240", 
    //           email:"toto@gmail.com",
    //            password:"mot de passe",
    //             is_admin:true
    //     };
    //     const id = 1;
  
    //     User.update = jest.fn().mockResolvedValue([true]);
  
    //     const result = await userRepository.update(pointData, id);
  
    //     expect(result).toBe(true);
    //     expect(User.update).toHaveBeenCalledTimes(1);
    //     expect(User.update).toBeCalledWith(pointData, { where: { id_pseudo: id } });
    //   });
    // });
  
    describe('delete', () => {
      it('should delete the point and return true', async () => {
        const id = 1;
  
        User.destroy = jest.fn().mockResolvedValue(true);
  
        const result = await userRepository.delete(id);
  
        expect(result).toBe(true);
        expect(User.destroy).toHaveBeenCalledTimes(1);
        expect(User.destroy).toBeCalledWith({ where: { id_pseudo: id } });
      });
    });
  });