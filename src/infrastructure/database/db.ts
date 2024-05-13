import mongoose from "mongoose";

export async function db_connect(connectionString: string) {
     await  mongoose.connect(connectionString );
 
}