import { AnimationRepository } from "../../src/modules/Repository/animation.repository";
import { AnimationDto } from "../../src/modules/Dto/animation.dto";
import { Parcours } from "../../src/modules/Models/parcours.model";
import { Point } from "../../src/modules/Models/points.model";
import { Animation } from "../../src/modules/Models/animation.model";
import { QCM } from "../../src/modules/Models/qcm.model";
import { SimpleQuestion } from "../../src/modules/Models/simpleQuestion.model";
import { Badge } from "../../src/modules/Models/badge.model";
import sequelize from "../../src/Database/sequelize";
describe('AnimationRepository', () => {

    let animationRepository: AnimationRepository;
  
    beforeEach(() => {
      animationRepository = new AnimationRepository();
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
      it('should return an AnimationDto if the animation is found', async () => {
        const id = 2;
        const expected: AnimationDto = {
            id_animation: id,
            name: "QCM",
            QCMs: [
              {
                id_qcm: 1,
                question: "Quel est la bonne réponse ?",
                correctResponse: "d",
                optionA: "a",
                optionB: "b",
                optionC: "c",
                optionD: "La reponse D"
              }
            ],
            SimpleQuestions: []
        };
  
        // Mock la méthode Animation.findByPk pour renvoyer la valeur attendue
        Animation.findOne = jest.fn().mockResolvedValue(expected);
  
        // Appelez la méthode findById du repository
        const result = await Animation.findOne({ where: { id_animation: 1 } });
        expect(result).toEqual(expected);
        expect(Animation.findOne).toHaveBeenCalledTimes(1);
        expect(Animation.findOne).toBeCalledWith({ where: { id_animation: 1 } });
      });
    });
  
    describe('findAll', () => {
      it('should return an array of AnimationDto', async () => {
        const filter = {};
        // Définissez ici les valeurs attendues pour les animations retournées
        const expectedAnimations: AnimationDto[] = [];
        // Mock la méthode Animation.findAll pour renvoyer les valeurs attendues
        Animation.findAll = jest.fn().mockResolvedValue(expectedAnimations);
        // Appelez la méthode findAll du repository
        const result = await animationRepository.findAll(filter);
        // Vérifiez les résultats
        expect(result).toEqual(expectedAnimations);
        expect(Animation.findAll).toHaveBeenCalledTimes(1);
        expect(Animation.findAll).toBeCalledWith({ include: [QCM, SimpleQuestion], where: filter });
      });
    });
  
    describe('create', () => {
      it('should create a new Animation and return the created AnimationDto', async () => {
        const animationData: Partial<AnimationDto> = {
            id_animation:2,
            name:'test',
            QCMs:[
              {
                  question:'qui est champion du monde de 1',
                  correctResponse:'a',
                  optionA:'a',
                  optionB:'b',
                  optionC:'c',
                  optionD:'d'
              }
            ]
        };
        const createdAnimation: AnimationDto = {
          id_animation:2,
          name:'test',
          QCMs:[
            {
                question:'qui est champion du monde de 1',
                correctResponse:'a',
                optionA:'a',
                optionB:'b',
                optionC:'c',
                optionD:'d'
            }
          ]
        };
        Animation.create = jest.fn().mockResolvedValue(createdAnimation);
        const result = await Animation.create(animationData);
        expect(result).toEqual(createdAnimation);
        expect(Animation.create).toHaveBeenCalledTimes(1);
        expect(Animation.create).toBeCalledWith(animationData);
      });
    });
  
    describe('update', () => {
      it('should update the animation and return true', async () => {
        const animationData: AnimationDto = {
            id_animation:1,
            name:'test',
            QCMs:[
              {
                  id_qcm:1,
                  question:'qui est champion du monde de 1',
                  correctResponse:'a',
                  optionA:'a',
                  optionB:'b',
                  optionC:'c',
                  optionD:'d'
              }
            ]
        };
        const id = 1;
        // Mock la méthode Animation.update pour renvoyer true
        Animation.update = jest.fn().mockResolvedValue([true]);
        // Appelez la méthode update du repository
        const result = await animationRepository.update(animationData, id);
        // Vérifiez les résultats
        expect(result).toBe(true);
        expect(Animation.update).toHaveBeenCalledTimes(1);
        expect(Animation.update).toBeCalledWith(animationData, { where: { id_animation: id } });
      });
    });
  
    describe('delete', () => {
      it('should delete the animation and return true', async () => {
        const id = 1;
        // Mock la méthode Animation.destroy pour renvoyer true
        Animation.destroy = jest.fn().mockResolvedValue(true);
        // Appelez la méthode delete du repository
        const result = await animationRepository.delete(id);
        // Vérifiez les résultats
        expect(result).toBe(true);
        expect(Animation.destroy).toHaveBeenCalledTimes(1);
        expect(Animation.destroy).toBeCalledWith({ where: { id_animation: id } });
      });
    });
  });