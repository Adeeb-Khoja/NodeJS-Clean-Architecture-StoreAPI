import { productRouter } from "./product_router";




export default function routes(app: any, express: any) {
    app.use('/api/v1/products', productRouter(express));

}
