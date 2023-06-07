import { IService } from "../../src/modules/core/service.interface";
import { IRepository } from "../../src/modules/core/repository.interface";
import { SimpleQuestionDto } from "../../src/modules/Dto/simpleQuestion.dto";
import { SimpleQuestion } from "../../src/modules/Models/simpleQuestion.model";
import { SimpleQuestionService } from "../../src/modules/Service/simpleQuestion.service";


describe('SimplesQuestionsService', () => {
    let simpleQuestionsService: SimpleQuestionService;
    let simpleQuestionsRepository: IRepository<SimpleQuestionDto>;
  
    beforeEach(() => {
        simpleQuestionsRepository = {
        findAll: jest.fn(),
        findById: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      };
  
      simpleQuestionsService = new SimpleQuestionService(simpleQuestionsRepository);

      
    });
    describe('findAll', () => {
        it('should return an array of simples questions', async () => {
            const expectedsimplesquestions: SimpleQuestionDto[] = [
              { id_simple_question: 1, question:"qui est champion du monde de F1", response:"max verstappen" },
              { id_simple_question: 2, question:"Qui est septuple champion du monde de F1", response:"Lewis Hamilton"},
            ];
          
            jest.spyOn(simpleQuestionsRepository, 'findAll').mockResolvedValue(expectedsimplesquestions);
          
            const result = await simpleQuestionsRepository.findAll(undefined); // Call the method with `undefined`
          
            console.log('Expected Badge:', expectedsimplesquestions);
            console.log('Actual Result:', result);
          
            expect(result).toEqual(expectedsimplesquestions);
            expect(simpleQuestionsRepository.findAll).toHaveBeenCalledWith(undefined);
          });
  
          it('should return an empty array if no simples questions found', async () => {
            jest.spyOn(simpleQuestionsRepository, 'findAll').mockResolvedValue([]);
          
            const result = await simpleQuestionsService.findAll();
          
            console.log('Expected Empty Array: []');
            console.log('Actual Result:', result);
          
            expect(result).toEqual([]);
            expect(simpleQuestionsRepository.findAll).toHaveBeenCalledWith(undefined);
          });
  
      it('should pass the options parameter to the repository', async () => {
        const options = { someOption: 'value' };
  
        jest.spyOn(simpleQuestionsRepository, 'findAll').mockResolvedValue([]);
  
        await simpleQuestionsRepository.findAll(options);
  
        expect(simpleQuestionsRepository.findAll).toHaveBeenCalledWith(options);
      });
    });
    describe('findById', () => {
        it('should return a simples questions by its id', async () => {
          const id = 1;
          const expectedsimplesquestions: SimpleQuestionDto = { id_simple_question: 1, question:"qui est champion du monde de F1", response:"max verstappen" };
          jest.spyOn(simpleQuestionsRepository, 'findById').mockResolvedValue(expectedsimplesquestions);
    
          const result = await simpleQuestionsService.findById(id);
    
          expect(result).toEqual(expectedsimplesquestions);
          expect(simpleQuestionsRepository.findById).toHaveBeenCalledWith(id);
        });
    
        it('should return null if no parcours found', async () => {
          const id = 2;
          jest.spyOn(simpleQuestionsRepository, 'findById').mockResolvedValue(null);
    
          const result = await simpleQuestionsService.findById(id);
    
          expect(result).toBeNull();
          expect(simpleQuestionsRepository.findById).toHaveBeenCalledWith(id);
        });
      });
      describe('delete', () => {
        it('should delete the point with the given ID', async () => {
          const id = 1;
          jest.spyOn(simpleQuestionsRepository, 'delete').mockResolvedValue(true);
    
          const result = await simpleQuestionsService.delete(id);
    
          expect(result).toBe(true);
          expect(simpleQuestionsRepository.delete).toHaveBeenCalledWith(id);
        });
    });
    describe('update', () => {
        it('should update the point with the given ID', async () => {
          const id = 1;
          const simplesquestionsDTO: SimpleQuestionDto = {
            id_simple_question: 1, question: "qui est champion du monde de F1", response: "max verstappen"
          };
      
          const updatedsimplesquestion: SimpleQuestionDto = {
            id_simple_question: 1, question: "qui est champion du monde de F1", response: "max verstappen"
          };
      
          const simplesquestion: SimpleQuestion = {
            id_simple_question: simplesquestionsDTO.id_simple_question ?? 0,
            question: simplesquestionsDTO.question,
            response: simplesquestionsDTO.response,
            // Add other properties if necessary
          };
      
          jest.spyOn(simpleQuestionsRepository, 'update').mockResolvedValue(true);
      
          const result = await simpleQuestionsService.update(simplesquestion, id);
      
          console.log('Expected:', true);
          console.log('Result:', result);
      
          expect(result).toBe(true);
          expect(simpleQuestionsRepository.update).toHaveBeenCalledWith(simplesquestion, id);
        });
      });
      describe('create', () => {
        it('should create a new point', async () => {
          const simplesquestionsDTO: SimpleQuestionDto = { id_simple_question: 1, question: "qui est champion du monde de F1", response: "max verstappen" };
      
          const createdSimpleQuestion: SimpleQuestion = { id_simple_question: 1, question: "qui est champion du monde de F1", response: "max verstappen" };
      
          const simplesquestion: SimpleQuestion = {
            id_simple_question: simplesquestionsDTO.id_simple_question ?? 0,
            question: simplesquestionsDTO.question,
            response: simplesquestionsDTO.response,
            // Add other properties if necessary
          };
      
          jest.spyOn(simpleQuestionsRepository, 'create').mockResolvedValue(createdSimpleQuestion);
      
          const result = await simpleQuestionsService.create(simplesquestion);
      
          console.log('Expected:', createdSimpleQuestion);
          console.log('Result:', result);
      
          expect(result).toEqual(createdSimpleQuestion);
          expect(simpleQuestionsRepository.create).toHaveBeenCalledWith(simplesquestion);
        });
      });
});
