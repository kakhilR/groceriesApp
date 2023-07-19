import cors from 'cors';
import express from 'express';
import { productApiServices } from './routes/index.js';

export const expressApp = async (app) =>{
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(cors());
    // app.use(express.static(path.join(__dirname, '/public')));

    // events Listener
    // appEvents(app);
    
    productApiServices(app);

    // app.use()
}