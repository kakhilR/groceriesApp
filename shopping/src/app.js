import cors from 'cors';
import express from 'express';
import { shopping } from './routes/index.js';

export const expressApp = async (app, channel) => {

    app.use(express.json());
    app.use(cors());
    // app.use(express.static(__dirname + '/public'))

    //api
    // appEvents(app);


    shopping(app, channel);
    // error handling
    
}