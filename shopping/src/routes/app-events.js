import { ShoppingService } from "../services/shopping-services.js";

export const appEvents = (app) => {
    
    const service = new ShoppingService();

    app.use('/app-events',async (req,res,next) => {

        const { payload } = req.body;
        console.log("============= Shopping ================");
        
        console.log(payload);

        //handle subscribe events
        service.SubscribeEvents(payload);

        return res.status(200).json({message: 'notified!'});

    });

}