import { QcmDto } from "../../src/modules/Dto/qcm.dto";
import { QcmRepository } from "../../src/modules/Repository/qcm.repository"
import sequelize from "../../src/Database/sequelize";
import { QCM } from "../../src/modules/Models/qcm.model";
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
describe('QcmRepository', () => {
    let qcmRepository: QcmRepository;
  
    beforeEach(() => {
      qcmRepository = new QcmRepository();
    });
  
    describe('findById', () => {
        it('should return a PointDto if the point is found', async () => {
            const id = 1;
            const expected: QcmDto = {
              id_qcm: id,
              question: 'test',
              correctResponse:"a",
              optionA:"a",
              optionB:"b",
              optionC:"c",
              optionD:"d"
            
            };
      
            // Mock la méthode Point.findByPk pour renvoyer la valeur attendue
            QCM.findByPk = jest.fn().mockResolvedValue(expected);
      
            // Appelez la méthode findById du repository
            const result = await qcmRepository.findById(id);
      
            // Vérifiez les résultats
            expect(result).toEqual(expected);
            expect(QCM.findByPk).toHaveBeenCalledTimes(1);
            expect(QCM.findByPk).toBeCalledWith(id);
          });
  
    });
  
    describe('findAll', () => {
        it('should return an array of PointDto', async () => {
          const filter = {};
    
          // Définissez ici les valeurs attendues pour les points retournés
          const expectedPoints: QcmDto[] = [];
    
          // Mock la méthode Point.findAll pour renvoyer les valeurs attendues
          QCM.findAll = jest.fn().mockResolvedValue(expectedPoints);
    
          // Appelez la méthode findAll du repository
          const result = await qcmRepository.findAll(filter);
    
          // Vérifiez les résultats
          expect(result).toEqual(expectedPoints);
          expect(QCM.findAll).toHaveBeenCalledTimes(1);
          expect(QCM.findAll).toBeCalledWith({ where: filter });
        });
      });
  
    describe('create', () => {
        it('should create a new Point and return the created PointDto', async () => {
          const qcmData: Partial<QcmDto> = {
            question: 'test',
              correctResponse:"a",
              optionA:"a",
              optionB:"b",
              optionC:"c",
              optionD:"d"
          };
          const createdQcm: QcmDto = {
            question: 'test',
              correctResponse:"a",
              optionA:"a",
              optionB:"b",
              optionC:"c",
              optionD:"d"
          };
    
          QCM.create = jest.fn().mockResolvedValue(createdQcm);
    
          const result = await QCM.create(qcmData);
    
          expect(result).toEqual(createdQcm);
          expect(QCM.create).toHaveBeenCalledTimes(1);
          expect(QCM.create).toBeCalledWith(qcmData);
        });
    });
  
    describe('update', () => {
      it('should update the point and return true', async () => {
        const pointData: QcmDto = {
          question: 'test',
              correctResponse:"a",
              optionA:"a",
              optionB:"b",
              optionC:"c",
              optionD:"d"
        };
        const id = 1;
  
        QCM.update = jest.fn().mockResolvedValue([true]);
  
        const result = await qcmRepository.update(pointData, id);
  
        expect(result).toBe(true);
        expect(QCM.update).toHaveBeenCalledTimes(1);
        expect(QCM.update).toBeCalledWith(pointData, { where: { id_qcm: id } });
      });
    });
  
    describe('delete', () => {
      it('should delete the point and return true', async () => {
        const id = 1;
  
        QCM.destroy = jest.fn().mockResolvedValue(true);
  
        const result = await qcmRepository.delete(id);
  
        expect(result).toBe(true);
        expect(QCM.destroy).toHaveBeenCalledTimes(1);
        expect(QCM.destroy).toBeCalledWith({ where: { id_qcm: id } });
      });
    });
  });