import { Product } from "../../core/models/product";
import { IHttpRequest, IHttpResponse } from "../../core/interfaces/http/ihttp";
import { IProductController } from "../../core/interfaces/products/iproduct_controller";
import { IProductService } from "../../core/interfaces/products/iproduct_service";


export class ProductController implements IProductController{


    constructor( private productService: IProductService) {
        this.productService = productService;
    }


   async createProduct(req: IHttpRequest, res: IHttpResponse) : Promise<void> {
        //Use Mapper
        const data = new Product(
            req.body.id,
            req.body.name,
            req.body.brand,
            req.body.isFeatured,
            req.body.price,
            req.body.rating,
            req.body.createdAt
        );
        
        const product = await this.productService.createProduct(data)

        res.status(201).json(product);

    } 

    async updateProduct(req: IHttpRequest, res: IHttpResponse) : Promise<void> {
        //Use Mapper
        const data = new Product(
            req.body.id,
            req.body.name,
            req.body.brand,
            req.body.isFeatured,
            req.body.price,
            req.body.rating,
            req.body.createdAt
        );
        
        const product = await this.productService.updateProduct(req.params.id, data)

        res.status(200).json(product);
    }

    async deleteProduct(req: IHttpRequest, res: IHttpResponse) : Promise<void> {
        const product = await this.productService.deleteProduct(req.params.id)
        res.status(200).json(product);
    }

    async findProductByID(req: IHttpRequest, res: IHttpResponse) : Promise<void> {
        const product = await this.productService.findProductByID(req.params.id)
        res.status(200).json(product);
    }
    
    async findProducts(req: IHttpRequest, res: IHttpResponse) : Promise<void> {
        const {name , isFeatured, sort, page,limit,numericFilters} = req.query
       
        const products = await this.productService.findProducts(name,isFeatured,sort,page,limit,numericFilters)
        res.status(200).json( {products: products, nbHits:products.length});
    }

    

        
}