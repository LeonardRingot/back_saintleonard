import { ParcoursService } from "../../src/modules/Service/parcours.service";
import { IRepository } from "../../src/modules/core/repository.interface";
import { ParcoursDto } from "../../src/modules/Dto/parcours.dto";
import sequelize from "../../src/Database/sequelize";
import { ParcoursPoint } from "../../src/modules/Models/parcoursPoint.model";
import { Parcours } from "../../src/modules/Models/parcours.model";
import { Transaction } from "sequelize";

// jest.mock('../../src/modules/Models/parcours.model');
// jest.mock('../../src/modules/Models/parcoursPoint.model');
// jest.mock('../../src/Database/sequelize');
describe("database connection", () => {
    it("should connect to the database", async () => {
        expect.assertions(1);
        try {
            await sequelize.authenticate();
            console.log("Link established");
            expect(true).toBeTruthy();
        } catch (error) {
            console.error(`Error: ${error}`);
            expect(false).toBeTruthy();
        }
    });
});
describe("ParcoursService", () => {
    let parcoursService: ParcoursService;
    let parcoursRepository: IRepository<ParcoursDto>;

    beforeEach(() => {
        parcoursRepository = {
            findAll: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        };
        parcoursService = new ParcoursService(parcoursRepository);
    });
    describe("findAll", () => {
        it("should return an array of parcours", async () => {
            const expectedParcours: ParcoursDto[] = [
                { id_parcours: 1, name: "Parcours Libre" },
                { id_parcours: 2, name: "Ma Première découverte" },
            ];

            jest.spyOn(parcoursRepository, "findAll").mockResolvedValue(
                expectedParcours
            );

            const result = await parcoursService.findAll();

            console.log("Expected Parcours:", expectedParcours);
            console.log("Actual Result:", result);

            expect(result).toEqual(expectedParcours);
            expect(parcoursRepository.findAll).toHaveBeenCalledWith(undefined);
        });

        it("should return an empty array if no parcours found", async () => {
            jest.spyOn(parcoursRepository, "findAll").mockResolvedValue([]);

            const result = await parcoursService.findAll();

            console.log("Expected Empty Array: []");
            console.log("Actual Result:", result);

            expect(result).toEqual([]);
            expect(parcoursRepository.findAll).toHaveBeenCalledWith(undefined);
        });

        it("should pass the options parameter to the repository", async () => {
            const options = { someOption: "value" };

            jest.spyOn(parcoursRepository, "findAll").mockResolvedValue([]);

            await parcoursService.findAll(options);

            expect(parcoursRepository.findAll).toHaveBeenCalledWith(options);
        });
    });
    describe("findById", () => {
        it("should return a parcours by its id", async () => {
            const id = 1;
            const expectedParcours: ParcoursDto = {
                id_parcours: id,
                name: "Parcours 1",
            };
            jest.spyOn(parcoursRepository, "findById").mockResolvedValue(
                expectedParcours
            );

            const result = await parcoursService.findById(id);

            expect(result).toEqual(expectedParcours);
            expect(parcoursRepository.findById).toHaveBeenCalledWith(id);
        });

        it("should return null if no parcours found", async () => {
            const id = 2;
            jest.spyOn(parcoursRepository, "findById").mockResolvedValue(null);

            const result = await parcoursService.findById(id);

            expect(result).toBeNull();
            expect(parcoursRepository.findById).toHaveBeenCalledWith(id);
        });
    });
    describe("create", () => {
        it("should create a new parcours", async () => {
            const parcoursDto: ParcoursDto = {
                id_parcours: 1,
                name: "Parcours 1",
                animation: {
                    id_animation: 1,
                    name: "Animation 1",
                },
                points: [
                    {
                        id_point: 1,
                        name: "test1",
                        position: 1,
                        mainDescription: "oe",
                        smallDescription: "a",
                        lon: 63,
                        lat: 6,
                        QrCode: "ae",
                    },
                    {
                        id_point: 2,
                        name: "test2",
                        position: 2,
                        mainDescription: "oe",
                        smallDescription: "a",
                        lon: 63,
                        lat: 6,
                        QrCode: "ae",
                    },
                    {
                        id_point: 3,
                        name: "test3",
                        position: 3,
                        mainDescription: "oe",
                        smallDescription: "a",
                        lon: 63,
                        lat: 6,
                        QrCode: "ae",
                    },
                ],
            };
            const createdParcours: ParcoursDto = {
                id_parcours: 1,
                name: "Parcours 1",
                animation: {
                    id_animation: 1,
                    name: "Animation 1",
                },
                points: [
                    {
                        id_point: 1,
                        name: "test1",
                        position: 1,
                        mainDescription: "oe",
                        smallDescription: "a",
                        lon: 63,
                        lat: 6,
                        QrCode: "ae",
                    },
                    {
                        id_point: 2,
                        name: "test2",
                        position: 2,
                        mainDescription: "oe",
                        smallDescription: "a",
                        lon: 63,
                        lat: 6,
                        QrCode: "ae",
                    },
                    {
                        id_point: 3,
                        name: "test3",
                        position: 3,
                        mainDescription: "oe",
                        smallDescription: "a",
                        lon: 63,
                        lat: 6,
                        QrCode: "ae",
                    },
                ],
            };

            Parcours.create = jest.fn().mockResolvedValue(createdParcours);
            jest.spyOn(ParcoursPoint, "create").mockResolvedValue(null);
            const commitMock = jest.fn();
            const rollbackMock = jest.fn();
            const afterCommitMock = jest.fn();
            const transactionMock = {
                commit: commitMock,
                rollback: rollbackMock,
                afterCommit: afterCommitMock,
                LOCK: "",
            } as unknown as Transaction;

            jest.spyOn(sequelize, "transaction").mockResolvedValue(
                transactionMock
            );

            const result = await parcoursService.create(parcoursDto);

            expect(result).toEqual(createdParcours);
            expect(Parcours.create).toHaveBeenCalledWith(
                {
                    name: parcoursDto.name,
                    id_animation: parcoursDto.animation
                        ? parcoursDto.animation.id_animation
                        : null,
                },
                { transaction: expect.any(Object) }
            );

            expect(ParcoursPoint.create).toHaveBeenCalledTimes(3);
            expect(sequelize.transaction).toHaveBeenCalledTimes(1);
            expect(commitMock).toHaveBeenCalled();
            expect(rollbackMock).not.toHaveBeenCalled();
        });
    });
    describe("delete", () => {
        it("should delete the course(parcours) with the given ID", async () => {
            const id = 1;
            jest.spyOn(parcoursRepository, "delete").mockResolvedValue(true);

            const result = await parcoursService.delete(id);

            expect(result).toBe(true);
            expect(parcoursRepository.delete).toHaveBeenCalledWith(id);
        });
    });
});
