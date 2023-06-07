import { IRepository } from "../../src/modules/core/repository.interface";
import { QcmDto } from "../../src/modules/Dto/qcm.dto";
import { QcmService } from "../../src/modules/Service/qcm.service";
import { IService } from "../../src/modules/core/service.interface";
import { QCM } from "../../src/modules/Models/qcm.model";
describe('QCMService', () => {
    let qcmService: QcmService;
    let qcmRepository: IRepository<QcmDto>;
  
    beforeEach(() => {
        qcmRepository = {
        findAll: jest.fn(),
        findById: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      };
  
      qcmService = new QcmService(qcmRepository);

      
    });
    describe('findAll', () => {
        it('should return an array of qcm', async () => {
            const expectedqcm: QcmDto[] = [
              { id_qcm: 1, question:"quelle est la bonne reponse", correctResponse:"a", optionA:"a", optionB:"b", optionC:"c", optionD:"d"},
              { id_qcm: 2, question:"qui est champion du monde de F1", correctResponse:"a", optionA:"Max Verstappen", optionB:"Charles Leclerc", optionC:"George Russel", optionD:"Pierre Gasly"},
            ];
          
            jest.spyOn(qcmRepository, 'findAll').mockResolvedValue(expectedqcm);
          
            const result = await qcmRepository.findAll(undefined); // Call the method with `undefined`
          
            console.log('Expected Badge:', expectedqcm);
            console.log('Actual Result:', result);
          
            expect(result).toEqual(expectedqcm);
            expect(qcmRepository.findAll).toHaveBeenCalledWith(undefined);
          });
  
          it('should return an empty array if no qcm found', async () => {
            jest.spyOn(qcmRepository, 'findAll').mockResolvedValue([]);
          
            const result = await qcmService.findAll();
          
            console.log('Expected Empty Array: []');
            console.log('Actual Result:', result);
          
            expect(result).toEqual([]);
            expect(qcmRepository.findAll).toHaveBeenCalledWith(undefined);
          });
  
      it('should pass the options parameter to the repository', async () => {
        const options = { someOption: 'value' };
  
        jest.spyOn(qcmRepository, 'findAll').mockResolvedValue([]);
  
        await qcmRepository.findAll(options);
  
        expect(qcmRepository.findAll).toHaveBeenCalledWith(options);
      });
    });
    describe('findById', () => {
        it('should return a qcm by its id', async () => {
          const id = 1;
          const expectedqcm: QcmDto =  { id_qcm: 1, question:"quelle est la bonne reponse", correctResponse:"a", optionA:"a", optionB:"b", optionC:"c", optionD:"d"};
          jest.spyOn(qcmRepository, 'findById').mockResolvedValue(expectedqcm);
    
          const result = await qcmService.findById(id);
    
          expect(result).toEqual(expectedqcm);
          expect(qcmRepository.findById).toHaveBeenCalledWith(id);
        });
    
        it('should return null if no parcours found', async () => {
          const id = 2;
          jest.spyOn(qcmRepository, 'findById').mockResolvedValue(null);
    
          const result = await qcmService.findById(id);
    
          expect(result).toBeNull();
          expect(qcmRepository.findById).toHaveBeenCalledWith(id);
        });
      });
      describe('delete', () => {
        it('should delete the qcm with the given ID', async () => {
          const id = 1;
          jest.spyOn(qcmRepository, 'delete').mockResolvedValue(true);
    
          const result = await qcmService.delete(id);
    
          expect(result).toBe(true);
          expect(qcmRepository.delete).toHaveBeenCalledWith(id);
        });
    });
    describe('update', () => {
        it('should update the qcm with the given ID', async () => {
          const id = 1;
          const qcmDTO: QcmDto = {
            id_qcm: 1,
             question:"quelle est la bonne reponse",
              correctResponse:"a",
               optionA:"a",
                optionB:"b",
                 optionC:"c",
                  optionD:"d"
          };
      
          const updatedBadge: QcmDto = {
            id_qcm: 1,
             question:"quelle est la bonne reponse",
              correctResponse:"a",
               optionA:"a",
                optionB:"b",
                 optionC:"c",
                  optionD:"d"
          };
      
          const qcm: QcmDto = {
            ...qcmDTO,
          };
          jest.spyOn(qcmRepository, 'update').mockResolvedValue(true);
      
          const result = await qcmService.update(qcm, id);
      
          console.log('Expected:', true);
          console.log('Result:', result);
      
          expect(result).toBe(true);
          expect(qcmRepository.update).toHaveBeenCalledWith(qcm, id);
        });
      });
      describe('create', () => {
        it('should create a new point', async () => {
          const qcmDTO: QcmDto = {
            id_qcm: 1,
             question:"quelle est la bonne reponse",
              correctResponse:"a",
               optionA:"a",
                optionB:"b",
                 optionC:"c",
                  optionD:"d"
          };
      
          const createdQCM: QcmDto = {
            id_qcm: 1,
             question:"quelle est la bonne reponse",
              correctResponse:"a",
               optionA:"a",
                optionB:"b",
                 optionC:"c",
                  optionD:"d"
          };
      
          const qcm: QcmDto = {
            ...qcmDTO,
          };
      
          jest.spyOn(qcmRepository, 'create').mockResolvedValue(createdQCM);
      
          const result = await qcmService.create(qcm);
      
          console.log('Expected:', createdQCM);
          console.log('Result:', result);
      
          expect(result).toEqual(createdQCM);
          expect(qcmRepository.create).toHaveBeenCalledWith(qcm);
        });
      });
});