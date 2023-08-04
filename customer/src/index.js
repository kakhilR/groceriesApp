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

    const channel = await createChannel(app);


    await expressApp(app, channel);
    

    app.use('/', (req, res)=>{
        return res.send("Hello World customers")
    });
    
    app.listen(8001, ()=>{
        console.log('listening on 8001 customer')
    }).on('error',(err)=>{
        console.log(err,"error from customer");
        process.exit();
    });
}

StartServer();