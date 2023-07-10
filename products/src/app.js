import cors from 'cors';
import express from 'express';
import { appEvents, products } from './routes';

module.exports = async (app) =>{
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(cors());
    app.use(express.static(path.join(__dirname, '/public')));

    // events Listener
    appEvents(app);
    
    products(app);
    
}