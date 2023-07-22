import cors from 'cors';
import express from 'express';
import { userApiServices } from './routes/index.js';

export const expressApp = async (app, channel)=>{
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(cors());
    // app.use(express.static(path.join(__dirname, '/public')))

    //  Listen to Events
    // appEvents(app);
    
    // api
    userApiServices(app, channel);

}