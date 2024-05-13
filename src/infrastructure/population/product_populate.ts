
import { db_connect } from '../database/db';
import { Product_DB } from '../database/schemas/product_scheme';
import * as fs from 'fs';
import * as dotenv from 'dotenv'

dotenv.config()

const start = async () => {
    try {
        const jsonFile =  fs.readFileSync('./src/infrastructure/population/products.json','utf8');
        const products = JSON.parse(jsonFile);
        await db_connect(process.env.DB_CONNECTION_STRING ?? '');
        await Product_DB.deleteMany()
        await Product_DB.create(products)
        console.log(`Successfully Created ${products.length} products`)
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
        
    }
   
    
}

start()