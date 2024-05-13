import { Product } from "../../models/product";

export interface IProductRepository {
    create(data: Product): Promise<Product | null>
    update(id: string, data: Product): Promise<Product | null>
    delete(id: string): Promise<Product | null>
    find(id: string): Promise<Product | null>
    getAll(name:string,isFeatured:string,sort:string,page:string,limit:string,numericFilters:string): Promise<Product[]>
}