import ProductService from "../../../core/services/product_service";
import { ProductRepository } from "../../../data/repositories/product_repository";
import { ProductController } from "../../../adapters/controllers/product_controller";
import 'express-async-errors'


export const productRouter = (express:any) => {
    const router = express.Router();

    const productRepository = new ProductRepository();
    const productService = new ProductService(productRepository);
    const productController = new ProductController(productService);
    
    //GET ALL PRODUCTS
    router.route('/').get(productController.findProducts.bind(productController))

    //GET PRODUCT BY ID
    router.route('/:id').get(productController.findProductByID.bind(productController))

    //CREATE PRODUCT
    router.route('/').post(productController.createProduct.bind(productController))

    //UPDATE PRODUCT
    router.route('/:id').put(productController.updateProduct.bind(productController))

    //DELETE PRODUCT
    router.route('/:id').delete(productController.deleteProduct.bind(productController))

    return router;
}