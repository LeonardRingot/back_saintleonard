import sequelize from "../../src/Database/sequelize";
import { SimpleQuestionDto } from "../../src/modules/Dto/simpleQuestion.dto";
import { SimpleQuestion } from "../../src/modules/Models/simpleQuestion.model";
import { SimpleQuestionRepository } from "../../src/modules/Repository/simpleQuestion.repository";

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
describe('SimpleQuestionRepository', () => {
    let simpleQuestionsRepository: SimpleQuestionRepository;
  
    beforeEach(() => {
        simpleQuestionsRepository = new SimpleQuestionRepository();
    });
  
    describe('findById', () => {
        it('should return a PointDto if the point is found', async () => {
            const id = 1;
            const expected: SimpleQuestionDto = {
              id_simple_question: id,
              question: 'test',
        response:"a",
            };
      
            // Mock la méthode Point.findByPk pour renvoyer la valeur attendue
            SimpleQuestion.findByPk = jest.fn().mockResolvedValue(expected);
      
            // Appelez la méthode findById du repository
            const result = await simpleQuestionsRepository.findById(id);
      
            // Vérifiez les résultats
            expect(result).toEqual(expected);
            expect(SimpleQuestion.findByPk).toHaveBeenCalledTimes(1);
            expect(SimpleQuestion.findByPk).toBeCalledWith(id);
          });
  
    });
  
    describe('findAll', () => {
        it('should return an array of PointDto', async () => {
          const filter = {};
    
          // Définissez ici les valeurs attendues pour les points retournés
          const expectedPoints: SimpleQuestionDto[] = [];
    
          // Mock la méthode Point.findAll pour renvoyer les valeurs attendues
          SimpleQuestion.findAll = jest.fn().mockResolvedValue(expectedPoints);
    
          // Appelez la méthode findAll du repository
          const result = await simpleQuestionsRepository.findAll(filter);
    
          // Vérifiez les résultats
          expect(result).toEqual(expectedPoints);
          expect(SimpleQuestion.findAll).toHaveBeenCalledTimes(1);
          expect(SimpleQuestion.findAll).toBeCalledWith({ where: filter });
        });
      });
  
    describe('create', () => {
        it('should create a new Point and return the created PointDto', async () => {
          const qcmData: Partial<SimpleQuestionDto> = {
            question: 'test',
        response:"a",
          };
          const createdQcm: SimpleQuestionDto = {
            question: 'test',
            response:"a",
          };
    
          SimpleQuestion.create = jest.fn().mockResolvedValue(createdQcm);
    
          const result = await SimpleQuestion.create(qcmData);
    
          expect(result).toEqual(createdQcm);
          expect(SimpleQuestion.create).toHaveBeenCalledTimes(1);
          expect(SimpleQuestion.create).toBeCalledWith(qcmData);
        });
    });
  
    describe('update', () => {
      it('should update the point and return true', async () => {
        const pointData: SimpleQuestionDto = {
          id_simple_question: 1,
          question: 'test',
        response:"a",
        };
        const id = 1;
  
        SimpleQuestion.update = jest.fn().mockResolvedValue([true]);
  
        const result = await simpleQuestionsRepository.update(pointData, id);
  
        expect(result).toBe(true);
        expect(SimpleQuestion.update).toHaveBeenCalledTimes(1);
        expect(SimpleQuestion.update).toBeCalledWith(pointData, { where: { id_simple_question: id } });
      });
    });
  
    describe('delete', () => {
      it('should delete the point and return true', async () => {
        const id = 1;
  
        SimpleQuestion.destroy = jest.fn().mockResolvedValue(true);
  
        const result = await simpleQuestionsRepository.delete(id);
  
        expect(result).toBe(true);
        expect(SimpleQuestion.destroy).toHaveBeenCalledTimes(1);
        expect(SimpleQuestion.destroy).toBeCalledWith({ where: { id_simple_question: id } });
      });
    });
  });