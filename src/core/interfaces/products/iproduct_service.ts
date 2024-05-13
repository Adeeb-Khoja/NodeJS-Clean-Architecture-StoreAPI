import { Product } from "../../models/product"


export interface IProductService {
  createProduct(data: Product): Promise<Product| null>;
  updateProduct(id: string, data: Product): Promise<Product | null>;
  deleteProduct(id: string): Promise<Product | null>;
  findProductByID(id: string): Promise<Product | null>;
  findProducts(name:string,isFeatured:string,sort:string,page:string,limit:string, numericFilters:string): Promise<Product[]>;
}