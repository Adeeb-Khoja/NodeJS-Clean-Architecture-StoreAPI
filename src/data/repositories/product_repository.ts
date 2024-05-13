import { Model } from "mongoose";
import { IProductRepository } from "../../core/interfaces/products/iproduct_repository";
import { Product } from "../../core/models/product";
import { IProductDB, Product_DB, Product_Mapper } from "../../infrastructure/database/schemas/product_scheme";
import {  mongo_numeric_filter } from "../../utils/db_utils";

//Mongoose Repository See: https://mongoosejs.com/docs/guide.html
export class ProductRepository implements IProductRepository {
  private product_db: Model<IProductDB>;

  constructor() {
    this.product_db = Product_DB;
  }

  async create(data: Product): Promise<Product> {
    const product = await this.product_db.create(data);
    return Product_Mapper.toEntity(product);
  }

  async update(id: string, data: Product): Promise<Product | null> {
    const product = await this.product_db.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!product) return null;

    return Product_Mapper.toEntity(product);
  }

  async delete(id: string): Promise<Product | null> {
    const product = await this.product_db.findByIdAndDelete(id);
    if (!product) return null;

    return Product_Mapper.toEntity(product);
  }

  async find(id: string): Promise<Product | null> {
    const product = await this.product_db.findById(id);
    if(!product) return null;

    return Product_Mapper.toEntity(product);
  }

  async getAll(name:string,isFeatured:string,sort:string,page:string,limit:string,numericFilters:string): Promise<Product[]> {
    let queryObject : Record<string,any> = {}

    //QUERY FILTERS
    if(name){
      //See: https://www.mongodb.com/docs/manual/reference/operator/query/
        queryObject.name = { $regex: name, $options: 'i' }  //match pattern search with case insensitive
    }
    if(isFeatured){
        queryObject.isFeatured = isFeatured == "true" ? true : false
    }

     //NUMERIC FILTERS
    //See https://techlia.hashnode.dev/add-dynamic-numeric-filters-to-your-crud-api
    const options = ['price','rating']
    const numericFilterObject = mongo_numeric_filter(numericFilters,options)
    queryObject = {...queryObject,...numericFilterObject}

    console.log(numericFilters)
    console.log(queryObject)

    const queryPromise = this.product_db.find(queryObject)

    //SORTING
    //Chaining Sort before awaiting results | See: https://mongoosejs.com/docs/api/query.html#Query.prototype.sort()
    if(sort){
      const sortString = sort.split(',').join(' ')
      queryPromise.sort(sortString)
      console.log(`Sorting by.. ${sortString}`)
    }
    else{
      queryPromise.sort('-createdAt')
    }

    //PAGINATION
    //Default Pagination, First 10 items in first page
    const pageNumber = Number(page) || 1
    const limitNumber = Number(limit) || 10
    const skip  = (pageNumber - 1) * limitNumber   //Page = 10, skip 9 Pages * 10 items = 90 items

    queryPromise.skip(skip).limit(limitNumber)

   
    
    const products = await queryPromise
    return products.map((product) => Product_Mapper.toEntity(product));
  }
}