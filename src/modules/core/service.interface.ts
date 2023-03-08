export interface IService<T> {
	findById(id: number): Promise<T | null>;
	findAll(): Promise<T[] | null>;
	create(t: T): Promise<T | null>;
	update(t: T, id: number): Promise<boolean | number>;
	delete(id: number): Promise<boolean | number>;
}