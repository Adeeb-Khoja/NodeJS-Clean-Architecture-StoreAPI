import { IHttpRequest, IHttpResponse } from "../http/ihttp";

export interface IProductController{
    createProduct: (req: IHttpRequest, res: IHttpResponse) => Promise<void>;
    updateProduct: (req: IHttpRequest, res: IHttpResponse) => Promise<void>;
    deleteProduct: (req: IHttpRequest, res: IHttpResponse) => Promise<void>;
    findProductByID: (req: IHttpRequest, res: IHttpResponse) => Promise<void>;
    findProducts: (req: IHttpRequest, res: IHttpResponse) => Promise<void>;
}