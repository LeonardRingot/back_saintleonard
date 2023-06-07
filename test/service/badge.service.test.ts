import { IService } from "../../src/modules/core/service.interface";
import { IRepository } from "../../src/modules/core/repository.interface";
import { BadgeDto } from "../../src/modules/Dto/badge.dto";
import { Badge } from "../../src/modules/Models/badge.model";
import { BadgeService } from "../../src/modules/Service/badge.service";
import sequelize from "../../src/Database/sequelize";
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
describe("BadgeService", () => {
    let badgeService: BadgeService;
    let badgeRepository: IRepository<BadgeDto>;

    beforeEach(() => {
        badgeRepository = {
            findAll: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        };

        badgeService = new BadgeService(badgeRepository);
    });
    describe("findAll", () => {
        it("should return an array of badge", async () => {
            const expectedbadge: BadgeDto[] = [
                { id_badge: 1, name: "badge 1", image: "test.jpg" },
                { id_badge: 2, name: "badge 2", image: "test2.jpg" },
            ];

            jest.spyOn(badgeRepository, "findAll").mockResolvedValue(
                expectedbadge
            );

            const result = await badgeRepository.findAll(undefined); // Call the method with `undefined`

            console.log("Expected Badge:", expectedbadge);
            console.log("Actual Result:", result);

            expect(result).toEqual(expectedbadge);
            expect(badgeRepository.findAll).toHaveBeenCalledWith(undefined);
        });

        it("should return an empty array if no badge found", async () => {
            jest.spyOn(badgeRepository, "findAll").mockResolvedValue([]);

            const result = await badgeService.findAll();

            console.log("Expected Empty Array: []");
            console.log("Actual Result:", result);

            expect(result).toEqual([]);
            expect(badgeRepository.findAll).toHaveBeenCalledWith(undefined);
        });

        it("should pass the options parameter to the repository", async () => {
            const options = { someOption: "value" };

            jest.spyOn(badgeRepository, "findAll").mockResolvedValue([]);

            await badgeRepository.findAll(options);

            expect(badgeRepository.findAll).toHaveBeenCalledWith(options);
        });
    });
    describe("findById", () => {
        it("should return a badge by its id", async () => {
            const id = 1;
            const expectedbadge: BadgeDto = {
                id_badge: id,
                name: "badge 1",
                image: "a.jpg",
            };
            jest.spyOn(badgeRepository, "findById").mockResolvedValue(
                expectedbadge
            );

            const result = await badgeService.findById(id);

            expect(result).toEqual(expectedbadge);
            expect(badgeRepository.findById).toHaveBeenCalledWith(id);
        });

        it("should return null if no parcours found", async () => {
            const id = 2;
            jest.spyOn(badgeRepository, "findById").mockResolvedValue(null);

            const result = await badgeService.findById(id);

            expect(result).toBeNull();
            expect(badgeRepository.findById).toHaveBeenCalledWith(id);
        });
    });
    describe("delete", () => {
        it("should delete the badge with the given ID", async () => {
            const id = 1;
            jest.spyOn(badgeRepository, "delete").mockResolvedValue(true);

            const result = await badgeService.delete(id);

            expect(result).toBe(true);
            expect(badgeRepository.delete).toHaveBeenCalledWith(id);
        });
    });
    describe("update", () => {
        it("should update the badge with the given ID", async () => {
            const id = 1;
            const badgeDto: BadgeDto = {
                id_badge: 1,
                name: "Updated Badge",
                image: "newimage.jpg",
            };

            const updatedBadge: BadgeDto = {
                id_badge: 1,
                name: "Updated Badge",
                image: "newimage.jpg",
            };

            const badge: Badge = new Badge();
            badge.id_badge = badgeDto.id_badge;
            badge.name = badgeDto.name;
            badge.image = badgeDto.image;

            jest.spyOn(badgeRepository, "update").mockResolvedValue(true);

            const result = await badgeService.update(badge, id);

            console.log("Expected:", true);
            console.log("Result:", result);

            expect(result).toBe(true);
            expect(badgeRepository.update).toHaveBeenCalledWith(badge, id);
        });
    });
    describe("create", () => {
        it("should create a new badge", async () => {
            const badgeDto: BadgeDto = {
                id_badge: 1,
                name: "New Badge",
                image: "test.jpg",
            };

            const createdBadge: BadgeDto = {
                id_badge: 1,
                name: "New Badge",
                image: "test.jpg",
            };

            const badge: Badge = new Badge();
            badge.id_badge = badgeDto.id_badge;
            badge.name = badgeDto.name;
            badge.image = badgeDto.image;

            jest.spyOn(badgeRepository, "create").mockResolvedValue(
                createdBadge
            );

            const result = await badgeService.create(badge);

            console.log("Expected:", createdBadge);
            console.log("Result:", result);

            expect(result).toEqual(createdBadge);
            expect(badgeRepository.create).toHaveBeenCalledWith(badge);
        });
    });
});
