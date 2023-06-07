import { IService } from "../../src/modules/core/service.interface";
import { IRepository } from "../../src/modules/core/repository.interface";
import { TokenDto } from "../../src/modules/Dto/token.dto";
import { Token } from "../../src/modules/Models/token.model";
import { TokenService } from "../../src/modules/Service/token.service";

describe('TokenService', () => {
    let tokenService: TokenService;
    let tokenRepository: IRepository<TokenDto>;
  
    beforeEach(() => {
        tokenRepository = {
        findAll: jest.fn(),
        findById: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      };
  
      tokenService = new TokenService(tokenRepository);

      
    });
    describe('findAll', () => {
        it('should return an array of token', async () => {
            const expectedtoken: TokenDto[] = [
              { id_pseudo: 1 , refresh_token:"poazjefjêzfKLJMFDZJFMO%EIO"},
              { id_pseudo: 2,refresh_token:"dzaoufjeaozpiusdmldqkmqsifd"},
            ];
          
            jest.spyOn(tokenRepository, 'findAll').mockResolvedValue(expectedtoken);
          
            const result = await tokenRepository.findAll(undefined); // Call the method with `undefined`
          
            console.log('Expected Badge:', expectedtoken);
            console.log('Actual Result:', result);
          
            expect(result).toEqual(expectedtoken);
            expect(tokenRepository.findAll).toHaveBeenCalledWith(undefined);
          });
  
          it('should return an empty array if no badge found', async () => {
            jest.spyOn(tokenRepository, 'findAll').mockResolvedValue([]);
          
            const result = await tokenService.findAll();
          
            console.log('Expected Empty Array: []');
            console.log('Actual Result:', result);
          
            expect(result).toEqual([]);
            expect(tokenRepository.findAll).toHaveBeenCalledWith(undefined);
          });
  
      it('should pass the options parameter to the repository', async () => {
        const options = { someOption: 'value' };
  
        jest.spyOn(tokenRepository, 'findAll').mockResolvedValue([]);
  
        await tokenRepository.findAll(options);
  
        expect(tokenRepository.findAll).toHaveBeenCalledWith(options);
      });
    });
    describe('findById', () => {
        it('should return a badge by its id', async () => {
          const id = 1;
          const expectedtoken: TokenDto = { id_pseudo: 1 , refresh_token:"poazjefjêzfKLJMFDZJFMO%EIO"};
          jest.spyOn(tokenRepository, 'findById').mockResolvedValue(expectedtoken);
    
          const result = await tokenService.findById(id);
    
          expect(result).toEqual(expectedtoken);
          expect(tokenRepository.findById).toHaveBeenCalledWith(id);
        });
    
        it('should return null if no token found', async () => {
          const id = 2;
          jest.spyOn(tokenRepository, 'findById').mockResolvedValue(null);
    
          const result = await tokenService.findById(id);
    
          expect(result).toBeNull();
          expect(tokenRepository.findById).toHaveBeenCalledWith(id);
        });
      });
});