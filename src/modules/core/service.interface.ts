export interface IService<T> {
	findById(id: number): Promise<T | null>;
	findAll(): Promise<T[] | null>;
	create(t: T): Promise<T | null>;
	update(t: T, id: number, id2?: number): Promise<boolean | number>;
	delete(id: number): Promise<boolean | number>;
}

export interface AuthIService<D, T> {
    login(d: D): Promise<D>;
    refreshToken(t: T): Promise<T>
}