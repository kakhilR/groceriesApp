import mongoose from 'mongoose';

import { configurations } from '../config/index.js';

export const databaseConnection = async()=>{
    try{
        await mongoose.connect(configurations.DB_URL,{
            useNewUrlParser: true,
            useUnifiedTopology:true,
        });
        console.log(' DB connected');
    }catch(error){
        console.log("========Error=====");
        console.log(error,"error from shopping database");
        process.exit(1);
    }
}