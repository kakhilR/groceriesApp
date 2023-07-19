import express from 'express';
import { expressApp } from './app.js';
import { databaseConnection } from './database/index.js';

const StartServer = async ()=>{
    const app = express();

    await databaseConnection();

    await expressApp(app);

    app.use('/', (req,res,next)=>{
        return res.status(200).json("hello from shopping")
    })
    
    app.listen(8003, ()=>{
        console.log('listening on 8003')
    }).on('error',(err)=>{
        console.log(err);
        process.exit();
    });
}

StartServer();