import { Product } from "../models/product";
import { IProductRepository } from "../interfaces/products/iproduct_repository";
import { IProductService } from "../interfaces/products/iproduct_service";

 class ProductService implements IProductService {

    constructor(private productRepository: IProductRepository) {
        this.productRepository = productRepository;
    }

    
    async createProduct(data: Product): Promise<Product | null> {
        const product =  await this.productRepository.create(data);
        return product;
    }   

        async updateProduct(id: string, data: Product): Promise<Product | null> {
        return await this.productRepository.update(id, data);
    }

    async deleteProduct(id: string): Promise<Product |  null> {
        const product = await this.productRepository.delete(id);
        return product;
    }

    async findProductByID(id: string): Promise<Product| null> {
        return await this.productRepository.find(id);
    }
   async findProducts(name:string,isFeatured:string,sort:string,page:string,limit:string,numericFilters:string): Promise<Product[]> {

        return await this.productRepository.getAll(name,isFeatured,sort,page,limit,numericFilters);
    }
}

export default ProductService