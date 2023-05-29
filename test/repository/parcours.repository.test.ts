import { ParcoursRepository } from "../../src/modules/Repository/parcours.repository";
import { Parcours } from "../../src/modules/Models/parcours.model";
import { Point } from "../../src/modules/Models/points.model";
import { Animation } from "../../src/modules/Models/animation.model";
import { Badge } from "../../src/modules/Models/badge.model";
import { QcmDto } from "../../src/modules/Dto/qcm.dto";
import { SimpleQuestion } from "../../src/modules/Models/simpleQuestion.model";
import sequelize from "../../src/Database/sequelize";
import { ParcoursDto } from "../../src/modules/Dto/parcours.dto";
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
  describe('ParcoursRepository', () => {
    let parcoursRepository: ParcoursRepository;
  
    beforeEach(() => {
      parcoursRepository = new ParcoursRepository();
    });
  
    describe('findById', () => {
      it('should return a ParcoursDto if the parcours is found', async () => {
        const id = 1
       const expected : ParcoursDto={
        id_parcours:1,
        name:"le parcours",
        badge:{
          id_badge:1,
          name:"le badge",
          image:'test.jpg'
        },
        animation: {
          id_animation: 3,
          name: "mixte"
        },
        points:[
          {
            id_point:1,
            name:'la mairie',
            smallDescription: "ey8",
        mainDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, magnam culpa soluta deleniti repudiandae hic cum sit ipsum eius tenetur expedita ut maxime, vero praesentium. Sit temporibus omnis deserunt optio!\n Vitae libero voluptate saepe quam sed hic quisquam dolores accusantium sapiente ex facilis assumenda, repellat autem, maiores reiciendis nam at fugit similique. Perspiciatis magni ab et placeat vitae magnam quae! \n Tempora mollitia, quod quaerat omnis sit porro aperiam voluptatem eveniet cupiditate deserunt sed architecto quidem corrupti dolorem quibusdam animi itaque atque explicabo eos corporis earum. Odio optio consequatur eius incidunt! \n Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod voluptate laboriosam necessitatibus nemo libero impedit. Vitae nostrum earum itaque aliquid sapiente totam quo autem deserunt, quos ea? Tenetur, obcaecati deserunt.",
        lat: 50.68882216812662,
        lon: 1.6276329925928585,
        QrCode: "./qrcode.jpg",
        position: 1
          }
        ]
       }
        Parcours.findOne = jest.fn().mockResolvedValue(expected)
        const result = await Parcours.findOne({ where: { id_parcours: 1 } });
        expect(result).toEqual(expected);
        expect(Parcours.findOne).toHaveBeenCalledTimes(1);
        expect(Parcours.findOne).toBeCalledWith({ where: { id_parcours: 1 } });
      });
  
    });
    describe('create', () => {
      it('should create a new parcours and return the created parcoursdto', async () => {
        const id = 1
       const expected : Partial<ParcoursDto>={
        id_parcours:1,
        name:"le parcours",
        badge:{
          id_badge:1,
          name:"le badge",
          image:'test.jpg'
        },
        animation: {
          id_animation: 3,
          name: "mixte"
        },
        points:[
          {
            id_point:1,
            name:'la mairie',
            smallDescription: "ey8",
        mainDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, magnam culpa soluta deleniti repudiandae hic cum sit ipsum eius tenetur expedita ut maxime, vero praesentium. Sit temporibus omnis deserunt optio!\n Vitae libero voluptate saepe quam sed hic quisquam dolores accusantium sapiente ex facilis assumenda, repellat autem, maiores reiciendis nam at fugit similique. Perspiciatis magni ab et placeat vitae magnam quae! \n Tempora mollitia, quod quaerat omnis sit porro aperiam voluptatem eveniet cupiditate deserunt sed architecto quidem corrupti dolorem quibusdam animi itaque atque explicabo eos corporis earum. Odio optio consequatur eius incidunt! \n Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod voluptate laboriosam necessitatibus nemo libero impedit. Vitae nostrum earum itaque aliquid sapiente totam quo autem deserunt, quos ea? Tenetur, obcaecati deserunt.",
        lat: 50.68882216812662,
        lon: 1.6276329925928585,
        QrCode: "./qrcode.jpg",
        position: 1
          }
        ]
       }
       const createdParcours : ParcoursDto={
        id_parcours:1,
        name:"le parcours",
        badge:{
          id_badge:1,
          name:"le badge",
          image:'test.jpg'
        },
        animation: {
          id_animation: 3,
          name: "mixte"
        },
        points:[
          {
            id_point:1,
            name:'la mairie',
            smallDescription: "ey8",
        mainDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, magnam culpa soluta deleniti repudiandae hic cum sit ipsum eius tenetur expedita ut maxime, vero praesentium. Sit temporibus omnis deserunt optio!\n Vitae libero voluptate saepe quam sed hic quisquam dolores accusantium sapiente ex facilis assumenda, repellat autem, maiores reiciendis nam at fugit similique. Perspiciatis magni ab et placeat vitae magnam quae! \n Tempora mollitia, quod quaerat omnis sit porro aperiam voluptatem eveniet cupiditate deserunt sed architecto quidem corrupti dolorem quibusdam animi itaque atque explicabo eos corporis earum. Odio optio consequatur eius incidunt! \n Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod voluptate laboriosam necessitatibus nemo libero impedit. Vitae nostrum earum itaque aliquid sapiente totam quo autem deserunt, quos ea? Tenetur, obcaecati deserunt.",
        lat: 50.68882216812662,
        lon: 1.6276329925928585,
        QrCode: "./qrcode.jpg",
        position: 1
          }
        ]
       }
        Parcours.create = jest.fn().mockResolvedValue(createdParcours)
        const result = await Parcours.create(expected);
        expect(result).toEqual(createdParcours);
        expect(Parcours.create).toHaveBeenCalledTimes(1);
        expect(Parcours.create).toBeCalledWith(expected);
      });
  
    });
    describe('findAll', () => {
      it('should return an array of ParcoursDto', async () => {
        const filter = {};
        const expectedParcours: ParcoursDto[] = [];
        Parcours.findAll = jest.fn().mockResolvedValue(expectedParcours);
        const result = await parcoursRepository.findAll(filter);
        expect(result).toEqual(expectedParcours);
        expect(Parcours.findAll).toHaveBeenCalledTimes(1);
        expect(Parcours.findAll).toBeCalledWith({ include: [Point, Animation, Badge], where: filter });
      });
    });
    describe('update', () => {
      it('should update the parcours and return true', async () => {
        const parcoursData: ParcoursDto = {
          id_parcours:1,
          name:'test',

        };
        const id = 1;
  
        // Mock la méthode Parcours.update pour renvoyer true
        Parcours.update = jest.fn().mockResolvedValue([true]);
  
        // Appelez la méthode update du repository
        const result = await parcoursRepository.update(parcoursData, id);
  
        // Vérifiez les résultats
        expect(result).toBe(true);
        expect(Parcours.update).toHaveBeenCalledTimes(1);
        expect(Parcours.update).toBeCalledWith(parcoursData, { where: { id_parcours: id } });
      });
    });
    describe('delete', () => {
      it('should delete the parcours and return true', async () => {
        const id = 1;
  
        // Mock la méthode Parcours.destroy pour renvoyer true
        Parcours.destroy = jest.fn().mockResolvedValue(true);
  
        // Appelez la méthode delete du repository
        const result = await parcoursRepository.delete(id);
  
        // Vérifiez les résultats
        expect(result).toBe(true);
        expect(Parcours.destroy).toHaveBeenCalledTimes(1);
        expect(Parcours.destroy).toBeCalledWith({ where: { id_parcours: id } });
      });
    });
  });