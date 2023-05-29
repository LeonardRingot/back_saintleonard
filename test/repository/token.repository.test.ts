import { TokenDto } from "../../src/modules/Dto/token.dto";
import { TokenRepository } from "../../src/modules/Repository/token.repository"
import sequelize from "../../src/Database/sequelize";
import { Token } from "../../src/modules/Models/token.model";

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
  describe('TokenRepository', () => {
    let tokenRepository: TokenRepository;
  
    beforeEach(() => {
        tokenRepository = new TokenRepository();
    });
  
    describe('findById', () => {
        it('should return a PointDto if the point is found', async () => {
            const id = 1;
            const expected: TokenDto = {
              id_pseudo: id,
              refresh_token: 'ezrzertezfiuzefihuze',
            };
      
            // Mock la méthode Point.findByPk pour renvoyer la valeur attendue
            Token.findByPk = jest.fn().mockResolvedValue(expected);
      
            // Appelez la méthode findById du repository
            const result = await tokenRepository.findById(id);
      
            // Vérifiez les résultats
            expect(result).toEqual(expected);
            expect(Token.findByPk).toHaveBeenCalledTimes(1);
            expect(Token.findByPk).toBeCalledWith(id);
          });
  
    });
  
    describe('findAll', () => {
        it('should return an array of PointDto', async () => {
          const filter = {};
    
          // Définissez ici les valeurs attendues pour les points retournés
          const expectedPoints: TokenDto[] = [];
    
          // Mock la méthode Point.findAll pour renvoyer les valeurs attendues
          Token.findAll = jest.fn().mockResolvedValue(expectedPoints);
    
          // Appelez la méthode findAll du repository
          const result = await tokenRepository.findAll(filter);
    
          // Vérifiez les résultats
          expect(result).toEqual(expectedPoints);
          expect(Token.findAll).toHaveBeenCalledTimes(1);
          expect(Token.findAll).toBeCalledWith({ where: filter });
        });
      });
  
    describe('create', () => {
        it('should create a new Point and return the created PointDto', async () => {
          const qcmData: Partial<TokenDto> = {
           refresh_token:"kjhdzadoazjorazeorje"
          };
          const createdQcm: TokenDto = {
            refresh_token:"kjhdzadoazjorazeorje"
          };
    
          Token.create = jest.fn().mockResolvedValue(createdQcm);
    
          const result = await Token.create(qcmData);
    
          expect(result).toEqual(createdQcm);
          expect(Token.create).toHaveBeenCalledTimes(1);
          expect(Token.create).toBeCalledWith(qcmData);
        });
    });
  
    describe('update', () => {
      it('should update the point and return true', async () => {
        const pointData: TokenDto = {
          refresh_token: 'ezrzertezfiuzefihuze',
        };
        const id = 1;
  
        Token.update = jest.fn().mockResolvedValue([true]);
  
        const result = await tokenRepository.update(pointData, id);
  
        expect(result).toBe(true);
        expect(Token.update).toHaveBeenCalledTimes(1);
        expect(Token.update).toBeCalledWith(pointData, { where: { id_token: id } });
      });
    });
  
    describe('delete', () => {
      it('should delete the point and return true', async () => {
        const id = 1;
  
        Token.destroy = jest.fn().mockResolvedValue(true);
  
        const result = await tokenRepository.delete(id);
  
        expect(result).toBe(true);
        expect(Token.destroy).toHaveBeenCalledTimes(1);
        expect(Token.destroy).toBeCalledWith({ where: { id_token: id } });
      });
    });
  });