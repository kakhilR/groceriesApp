import mongoose from 'mongoose';
import { configurations } from '../config/index.js';


console.log(configurations.DB_URL,"uri")
export const databaseConnection =  async()=>{
    try{
        await mongoose.connect(configurations.DB_URL,{
            useNewUrlParser: true,
            useUnifiedTopology:true,
        });
        console.log(' DB connected');
    }catch(error){
        console.log("========Error=====");
        console.log(error,"from customer database");
        process.exit(1);
    }
}