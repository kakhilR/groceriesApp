import { userAuth } from '../middleware/auth.js';
import { ShoppingService } from '../services/shopping-services.js';
import { PublishUserEvent } from '../utils/index.js';


export const shopping = (app) =>{
    const service = new ShoppingService();


    app.post('/order',userAuth, async (req, res, next) =>{
        const { _id } = req.user;
        const { txnNumber} = req.body;

        const { data } = await service.PlaceOrder({_id,txnNumber});

        const payload = await service.GetOrderPayload(_id, data,'CREATE_ORDER');

        PublishUserEvent(payload);

        return res.status(200).json(data);
        
    })

    app.get('/orders',userAuth, async (req, res, next) =>{
        const {_id} = req.user;

        const {data} = await service.GetOrders(_id);
        request.status(200).json(data);
    })

    app.put('/cart',userAuth, async (req, res,next)=>{
        const {_id} = req.user;
        const {data} = await service.AddToCart(_id,req.body._id);
        request.status(200).json(data);
    })

    app.delete('/cart/:id',userAuth, async (req, res, next) =>{
        const {_id} = req.user;

        const {data} = await service.AddToCart(_id,req.body._id);

        request.status(200).json(data);
    })


    app.get('/cart',userAuth, async (req, res, next)=>{
        const { _id } = req.user;
        const {data} = await service.GetCart({_id});

        return request.status(200).json(data);
    });
}
