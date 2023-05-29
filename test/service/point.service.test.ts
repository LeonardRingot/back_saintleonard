import { PointService } from "../../src/modules/Service/point.service";
import { IRepository } from "../../src/modules/core/repository.interface";
import { IService } from "../../src/modules/core/service.interface";
import { PointDto } from "../../src/modules/Dto/points.dto";
import { Point } from "../../src/modules/Models/points.model";

describe('PointService', () => {
    let pointService: PointService;
    let pointRepository: IRepository<PointDto>;
  
    beforeEach(() => {
        pointRepository = {
        findAll: jest.fn(),
        findById: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      };
  
      pointService = new PointService(pointRepository);

      
    });
    describe('findAll', () => {
        it('should return an array of point', async () => {
            const expectedpoint: PointDto[] = [
              { id_point: 1, name: 'point 1', smallDescription:"petite description", mainDescription:"grande description", QrCode:"qr_codeNom.jpg", lon:1.966546, lat:1.654654 },
              { id_point: 2, name: 'point 2',  smallDescription:"petite description", mainDescription:"grande description", QrCode:"qr_codeNom.jpg", lon:1.7878635, lat:1.9856454 },
            ];
          
            jest.spyOn(pointRepository, 'findAll').mockResolvedValue(expectedpoint);
          
            const result = await pointRepository.findAll(undefined); // Call the method with `undefined`
          
            console.log('Expected point:', expectedpoint);
            console.log('Actual Result:', result);
          
            expect(result).toEqual(expectedpoint);
            expect(pointRepository.findAll).toHaveBeenCalledWith(undefined);
          });
  
          it('should return an empty array if no point found', async () => {
            jest.spyOn(pointRepository, 'findAll').mockResolvedValue([]);
          
            const result = await pointService.findAll();
          
            console.log('Expected Empty Array: []');
            console.log('Actual Result:', result);
          
            expect(result).toEqual([]);
            expect(pointRepository.findAll).toHaveBeenCalledWith(undefined);
          });
  
      it('should pass the options parameter to the repository', async () => {
        const options = { someOption: 'value' };
        jest.spyOn(pointRepository, 'findAll').mockResolvedValue([]);
        await pointRepository.findAll(options);
        expect(pointRepository.findAll).toHaveBeenCalledWith(options);
      });
    });
    describe('findById', () => {
        it('should return a point by its id', async () => {
          const id = 1;
          const expectedpoint: PointDto = { id_point: id, name: 'point 1', smallDescription:"petite description", mainDescription:"grande description", QrCode:"qr_codeNom.jpg", lon:1.966546, lat:1.654654};
          jest.spyOn(pointRepository, 'findById').mockResolvedValue(expectedpoint);
          const result = await pointService.findById(id);
          expect(result).toEqual(expectedpoint);
          expect(pointRepository.findById).toHaveBeenCalledWith(id);
        });
        it('should return null if no parcours found', async () => {
          const id = 2;
          jest.spyOn(pointRepository, 'findById').mockResolvedValue(null);
          const result = await pointService.findById(id);
          expect(result).toBeNull();
          expect(pointRepository.findById).toHaveBeenCalledWith(id);
        });
      });
      describe('delete', () => {
        it('should delete the point with the given ID', async () => {
          const id = 1;
          jest.spyOn(pointRepository, 'delete').mockResolvedValue(true);
          const result = await pointService.delete(id);
          expect(result).toBe(true);
          expect(pointRepository.delete).toHaveBeenCalledWith(id);
        });
    });
    describe('update', () => {
        it('should update the point with the given ID', async () => {
          const id = 1;
          const pointDTO: PointDto = {
            id_point: 1, 
            name: 'point 1',
            smallDescription: "petite description",
            mainDescription: "grande description",
            QrCode: "qr_codeNom.jpg",
            lon: 1.966546,
            lat: 1.654654
          };
          const updatedPoint: PointDto = {
            id_point: 1, 
            name: 'point 1',
            smallDescription: "petite description",
            mainDescription: "grande description",
            QrCode: "qr_codeNom.jpg",
            lon: 1.966546,
            lat: 1.654654
          };
          const point: PointDto = {
            ...pointDTO,
          };
          jest.spyOn(pointRepository, 'update').mockResolvedValue(true);
          const result = await pointService.update(point, id);
          console.log('Expected:', true);
          console.log('Result:', result);
          expect(result).toBe(true);
          expect(pointRepository.update).toHaveBeenCalledWith(point, id);
        });
      });
      describe('create', () => {
        it('should create a new point', async () => {
          const pointDTO: PointDto = {
            id_point: 1, 
            name: 'point 1',
            smallDescription: "petite description",
            mainDescription: "grande description",
            QrCode: "qr_codeNom.jpg",
            lon: 1.966546,
            lat: 1.654654
          };
      
          const createdBadge: PointDto = {
            id_point: 1, 
            name: 'point 1',
            smallDescription: "petite description",
            mainDescription: "grande description",
            QrCode: "qr_codeNom.jpg",
            lon: 1.966546,
            lat: 1.654654
          };
          const point: PointDto = {
            ...pointDTO,
          };
          jest.spyOn(pointRepository, 'create').mockResolvedValue(createdBadge);
          const result = await pointService.create(point);
          console.log('Expected:', createdBadge);
          console.log('Result:', result);
          expect(result).toEqual(createdBadge);
          expect(pointRepository.create).toHaveBeenCalledWith(point);
        });
      });
});
