import { BadgeRepository } from "../../src/modules/Repository/badge.repository";
import { BadgeDto } from "../../src/modules/Dto/badge.dto";
import { Parcours } from "../../src/modules/Models/parcours.model";
import { Point } from "../../src/modules/Models/points.model";
import { QCM } from "../../src/modules/Models/qcm.model";
import { SimpleQuestion } from "../../src/modules/Models/simpleQuestion.model";
import { Badge } from "../../src/modules/Models/badge.model";
import sequelize from "../../src/Database/sequelize";

describe('BadgeRepository', () => {

    let badgeRepository: BadgeRepository;
  
    beforeEach(() => {
      badgeRepository = new BadgeRepository();
    });
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
      describe('findById', () => {
        it('should return a BadgeDto if the badge is found', async () => {
          const id = 2;
          const expected: BadgeDto = {
            id_badge: id,
            name: 'badge',
            image: 'test.jpg',
          };
    
          // Mock la méthode Badge.findByPk pour renvoyer la valeur attendue
          Badge.findByPk = jest.fn().mockResolvedValue(expected);
    
          // Appelez la méthode findById du repository
          const result = await badgeRepository.findById(id);
    
          // Vérifiez les résultats
          expect(result).toEqual(expected);
          expect(Badge.findByPk).toHaveBeenCalledTimes(1);
          expect(Badge.findByPk).toBeCalledWith(id);
        });
      });
    
      describe('findAll', () => {
        it('should return an array of BadgeDto', async () => {
          const filter = {};
    
          // Définissez ici les valeurs attendues pour les badges retournés
          const expectedBadges: BadgeDto[] = [];
    
          // Mock la méthode Badge.findAll pour renvoyer les valeurs attendues
          Badge.findAll = jest.fn().mockResolvedValue(expectedBadges);
    
          // Appelez la méthode findAll du repository
          const result = await badgeRepository.findAll(filter);
    
          // Vérifiez les résultats
          expect(result).toEqual(expectedBadges);
          expect(Badge.findAll).toHaveBeenCalledTimes(1);
          expect(Badge.findAll).toBeCalledWith({ where: filter });
        });
      });
    
      describe('create', () => {
        it('should create a new Badge and return the created BadgeDto', async () => {
          const badgeData: Partial<BadgeDto> = {
            id_badge: 2,
            name: 'test',
            image: 'test.jpg',
          };
          const createdBadge: BadgeDto = {
            id_badge: 2,
            name: 'test',
            image: 'test.jpg',
          };
          Badge.create = jest.fn().mockResolvedValue(createdBadge);
    
          const result = await badgeRepository.create(badgeData);
    
          expect(result).toEqual(createdBadge);
          expect(Badge.create).toHaveBeenCalledTimes(1);
          expect(Badge.create).toBeCalledWith(badgeData);
        });
      });
    
      describe('update', () => {
        it('should update the badge and return true', async () => {
            const id = 1;
          const badgeData: Partial<BadgeDto> = {
            id_badge: 1,
            name: 'test',
            image: 'test.jpg',
          };
        
      
          // Mock la méthode Badge.update pour renvoyer true
          Badge.update = jest.fn().mockResolvedValue([true]);
      
          // Appelez la méthode update du repository
          const result = await badgeRepository.update(badgeData, id);
      
          // Vérifiez les résultats
          expect(result).toBe(true);
          expect(Badge.update).toHaveBeenCalledTimes(1);
          expect(Badge.update).toBeCalledWith(badgeData, { where: { id_badge: id } });
        });
      });
    
      describe('delete', () => {
        it('should delete the badge and return true', async () => {
          const id = 1;
    
          // Mock la méthode Badge.destroy pour renvoyer true
          Badge.destroy = jest.fn().mockResolvedValue(true);
    
          // Appelez la méthode delete du repository
          const result = await badgeRepository.delete(id);
    
          // Vérifiez les résultats
          expect(result).toBe(true);
          expect(Badge.destroy).toHaveBeenCalledTimes(1);
          expect(Badge.destroy).toBeCalledWith({ where: { id_badge: id } });
        });
      });
  });