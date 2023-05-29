import { AnimationService } from "../../src/modules/Service/animation.service";
import { IRepository } from "../../src/modules/core/repository.interface";
import { AnimationDto } from "../../src/modules/Dto/animation.dto";
import sequelize from "../../src/Database/sequelize";
import { QCM } from "../../src/modules/Models/qcm.model";
import { Animation } from "../../src/modules/Models/animation.model";
import { SimpleQuestionService } from "../../src/modules/Service/simpleQuestion.service";

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
describe('AnimationService', () => {
    let animationService: AnimationService;
    let animationRepository: IRepository<AnimationDto>;
  
    beforeEach(() => {
        animationRepository = {
        findAll: jest.fn(),
        findById: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      };
  
      animationService = new AnimationService(animationRepository);

      
    });
    describe('findAll', () => {
        it('should return an array of animation', async () => {
            const expectedAnimation: AnimationDto[] = [
              { id_animation: 1, name: 'QCMS' },
              { id_animation: 2, name: 'Simples questions' },
            ];
          
            jest.spyOn(animationRepository, 'findAll').mockResolvedValue(expectedAnimation);
          
            const result = await animationService.findAll();
          
            console.log('Expected Parcours:', expectedAnimation);
            console.log('Actual Result:', result);
          
            expect(result).toEqual(expectedAnimation);
            expect(animationRepository.findAll).toHaveBeenCalledWith(undefined);
          });
  
          it('should return an empty array if no animation found', async () => {
            jest.spyOn(animationRepository, 'findAll').mockResolvedValue([]);
          
            const result = await animationService.findAll();
          
            console.log('Expected Empty Array: []');
            console.log('Actual Result:', result);
          
            expect(result).toEqual([]);
            expect(animationRepository.findAll).toHaveBeenCalledWith(undefined);
          });
  
      it('should pass the options parameter to the repository', async () => {
        const options = { someOption: 'value' };
  
        jest.spyOn(animationRepository, 'findAll').mockResolvedValue([]);
  
        await animationRepository.findAll(options);
  
        expect(animationRepository.findAll).toHaveBeenCalledWith(options);
      });
    });
    describe('findById', () => {
        it('should return a animation by its id', async () => {
          const id = 1;
          const expectedAnimation: AnimationDto = { id_animation: id, name: 'animation 1' };
          jest.spyOn(animationRepository, 'findById').mockResolvedValue(expectedAnimation);
    
          const result = await animationService.findById(id);
    
          expect(result).toEqual(expectedAnimation);
          expect(animationRepository.findById).toHaveBeenCalledWith(id);
        });
    
        it('should return null if no parcours found', async () => {
          const id = 2;
          jest.spyOn(animationRepository, 'findById').mockResolvedValue(null);
    
          const result = await animationService.findById(id);
    
          expect(result).toBeNull();
          expect(animationRepository.findById).toHaveBeenCalledWith(id);
        });
      });
});

