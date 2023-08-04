import express from 'express';
import { expressApp } from './app.js';
import { databaseConnection } from './database/index.js';
import { createChannel } from './utils/index.js';

const StartServer = async ()=>{
    const app = express();

    await databaseConnection();

    const channel = await createChannel();

    await expressApp(app,channel);

    app.use('/', (req,res,next)=>{
        return res.status(200).json("hello from shopping")
    })
    
    app.listen(8003, ()=>{
        console.log('listening on 8003 shopping service')
    }).on('error',(err)=>{
        console.log(err,"error from shopping service");
        process.exit();
    });
}

StartServer();