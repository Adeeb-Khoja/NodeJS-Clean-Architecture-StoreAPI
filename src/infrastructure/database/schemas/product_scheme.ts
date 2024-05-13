import * as mongoose from "mongoose";
import { Product } from "../../../core/models/product";

export interface IProductDB {
    _id: mongoose.ObjectId,
    name: string,
    brand: string,
    price: number,
    isFeatured: boolean,
    rating: number,
    createdAt: Date
}


const ProductSchema = new mongoose.Schema<IProductDB>({
name: {
    type:String,
    required: [true, "Product must have name"]
},
brand: {
    type:String,
    required: [true,'Product Brand is required'],
    // enum: {
    //     values: ['addidas','nike','puma'],
    //     message: '{VALUE} is not supported'
    // }
},
price: {
    type: Number,
    required: [true,'Product Price is required']
},
isFeatured: {
    type: Boolean,
    default: false
},
rating:{
    type: Number,
    default: 0
},
createdAt : {
    type: Date,
    default : Date.now()
}
})

export const Product_DB =   mongoose.model<IProductDB>('Product',ProductSchema)


export const Product_Mapper = {
    toEntity : (model : IProductDB) => {
        return new Product(
            model._id.toString(),
            model.name,
            model.brand,
            model.isFeatured,
            model.price,
            model.rating,
            model.createdAt
        )
    }
}