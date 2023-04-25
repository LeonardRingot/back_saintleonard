export interface IRepository<T> {
	findById(id: number): Promise<T | null>;
	findAll(options?: any): Promise<T[]>;
	create(t: T): Promise<T>;
	update(t: T, id: number): Promise<boolean | number>;
	delete(id: number): Promise<boolean | number>;
}

export interface IRepositoryUser<D,T> {
    findByPseudo(pseudo: string): Promise<D | null>;
	findById(id: number): Promise<T | null>;
	findAll(options?: any): Promise<T[]>;
	create(t: T): Promise<T>;
	update(t: T, id: number): Promise<boolean | number>;
	delete(id: number): Promise<boolean | number>;
}

