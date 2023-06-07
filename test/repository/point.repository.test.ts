import sequelize from "../../src/Database/sequelize";
import { PointDto } from "../../src/modules/Dto/points.dto";

import { Point } from "../../src/modules/Models/points.model";
import { PointRepository } from "../../src/modules/Repository/point.repository";
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
describe('PointRepository', () => {
    let pointRepository: PointRepository;
  
    beforeEach(() => {
      pointRepository = new PointRepository();
    });
  
    describe('findById', () => {
        it('should return a PointDto if the point is found', async () => {
            const id = 1;
            const expected: PointDto = {
              id_point: id,
              name: 'test',
              smallDescription: 'petite description',
              mainDescription: 'grande description',
              lon: 1.966546,
              lat: 1.654654,
              QrCode: 'qr_codeNom.jpg',
            };
      
            // Mock la méthode Point.findByPk pour renvoyer la valeur attendue
            Point.findByPk = jest.fn().mockResolvedValue(expected);
      
            // Appelez la méthode findById du repository
            const result = await pointRepository.findById(id);
      
            // Vérifiez les résultats
            expect(result).toEqual(expected);
            expect(Point.findByPk).toHaveBeenCalledTimes(1);
            expect(Point.findByPk).toBeCalledWith(id);
          });
  
    });
  
    describe('findAll', () => {
        it('should return an array of PointDto', async () => {
          const filter = {};
    
          // Définissez ici les valeurs attendues pour les points retournés
          const expectedPoints: PointDto[] = [];
    
          // Mock la méthode Point.findAll pour renvoyer les valeurs attendues
          Point.findAll = jest.fn().mockResolvedValue(expectedPoints);
    
          // Appelez la méthode findAll du repository
          const result = await pointRepository.findAll(filter);
    
          // Vérifiez les résultats
          expect(result).toEqual(expectedPoints);
          expect(Point.findAll).toHaveBeenCalledTimes(1);
          expect(Point.findAll).toBeCalledWith({ where: filter });
        });
      });
  
    describe('create', () => {
        it('should create a new Point and return the created PointDto', async () => {
          const pointData: Partial<PointDto> = {
            name: 'test',
            smallDescription: 'petite description',
            mainDescription: 'grande description',
            QrCode: 'qr_codeNom.jpg',
            lon: 1.966546,
            lat: 1.654654,
          };
          const createdPoint: PointDto = {
            id_point: 1,
            name: 'test',
            smallDescription: 'petite description',
            mainDescription: 'grande description',
            QrCode: 'qr_codeNom.jpg',
            lon: 1.966546,
            lat: 1.654654,
          };
    
          Point.create = jest.fn().mockResolvedValue(createdPoint);
    
          const result = await Point.create(pointData);
    
          expect(result).toEqual(createdPoint);
          expect(Point.create).toHaveBeenCalledTimes(1);
          expect(Point.create).toBeCalledWith(pointData);
        });
    });
  
    describe('update', () => {
      it('should update the point and return true', async () => {
        const pointData: PointDto = {
          id_point: 1,
          name: 'test',
          smallDescription:"petite description",
           mainDescription:"grande description",
            QrCode:"qr_codeNom.jpg", 
            lon:1.966546, lat:1.654654
        };
        const id = 1;
  
        Point.update = jest.fn().mockResolvedValue([true]);
  
        const result = await pointRepository.update(pointData, id);
  
        expect(result).toBe(true);
        expect(Point.update).toHaveBeenCalledTimes(1);
        expect(Point.update).toBeCalledWith(pointData, { where: { id_point: id } });
      });
    });
  
    describe('delete', () => {
      it('should delete the point and return true', async () => {
        const id = 1;
  
        Point.destroy = jest.fn().mockResolvedValue(true);
  
        const result = await pointRepository.delete(id);
  
        expect(result).toBe(true);
        expect(Point.destroy).toHaveBeenCalledTimes(1);
        expect(Point.destroy).toBeCalledWith({ where: { id_point: id } });
      });
    });
  });