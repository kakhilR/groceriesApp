import cors from 'cors';
import express from 'express';
import { expressApp } from './app.js';
import { databaseConnection } from './database/connection.js';

const StartServer = async ()=>{
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded());
    app.use(cors());
    // app.use(express.static(path.join(__dirname, '/public')))

    await databaseConnection();

    await expressApp(app);
    console.log("from here");
    
    app.get('/', (req, res)=>{
        return res.send("Hello World products")
    });
    
    app.listen(8002, ()=>{
        console.log('listening on 8002 products')
    }).on('error',(err)=>{
        console.log(err);
        process.exit();
    });
}

StartServer();