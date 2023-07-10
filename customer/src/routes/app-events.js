import { UserService } from '../services/user-service';


//  simple we are exposing one webhook to other service so other service 
// can directly call to our service by putting our base url (localhost:8080/customer/app-events) if ur call customer service from other service
module.exports = (app)=>{
    const service = new UserService();

    app.use('/app-events',async (req,res,next)=>{
        const {payload} = req.body;

        service.SubscribeEvents(payload);
        console.log("shopping service received events");
        return res.status(200).json(payload);
    })
}