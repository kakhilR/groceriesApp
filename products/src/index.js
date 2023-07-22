import cors from 'cors';
import express from 'express';
import { expressApp } from './app.js';
import { databaseConnection } from './database/connection.js';
import { createChannel } from './utils/index.js';

const StartServer = async ()=>{
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded());
    app.use(cors());
    // app.use(express.static(path.join(__dirname, '/public')))

    await databaseConnection();

    const channel = await createChannel();

    await expressApp(app, channel);
    console.log("from here");
    
    // app.use('/', (req, res)=>{
    //     return res.send("Hello World products")
    // });
    
    app.listen(8002, ()=>{
        console.log('listening on 8002 products')
    }).on('error',(err)=>{
        console.log(err);
        process.exit();
    });
}

StartServer();