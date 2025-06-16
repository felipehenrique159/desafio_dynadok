export interface IBaseRepository<T> {
  create(item: T): Promise<T>;
  update(id: string, item: Partial<T>): Promise<T | null>;
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  delete(id: string): Promise<T | null>;
}