import cors from 'cors';
import express from 'express';
import { appEvents, user } from './routes';

module.exports = async (app)=>{
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(cors());
    app.use(express.static(path.join(__dirname, '/public')))

    //  Listen to Events
    appEvents(app);
    
    // api
    user(app);


}