import { userAuth } from '../middlewares/auth.js';
import { UserService } from '../services/user-service.js';
import { subscribeMessage } from '../utils/index.js';

export const userApiServices = (app, channel)=>{
    const service = new UserService();

    subscribeMessage(channel, service);

    app.post('/signup', async (req,res,next) => {
        const { email, password, phone } = req.body;
        const { data } = await service.SignUp({ email, password, phone}); 
        res.json(data);

    });

    app.post('/signin',  async (req,res,next) => {
        
        const { email, password } = req.body;

        const { data } = await service.SignIn({ email, password});

        res.json(data);

    });

    // app.post('/address', UserAuth, async (req,res,next) => {
        
    //     const { _id } = req.user;


    //     const { street, postalCode, city,country } = req.body;

    //     const { data } = await service.AddNewAddress( _id ,{ street, postalCode, city,country});

    //     res.json(data);

    // });

    app.get('/profile', userAuth ,async (req,res,next) => {

        const { _id } = req.user;
        console.log(_id,"from customer")
        const { data } = await service.GetProfile({ _id });
        res.json(data);
    });
     

    app.get('/shoping-details', userAuth, async (req,res,next) => {
        const { _id } = req.user;
       const { data } = await service.GetShoppingDetails(_id);

       return res.json(data);
    });
    
    app.get('/wishlist', userAuth, async (req,res,next) => {
        const { _id } = req.user;
        const { data } = await service.GetWishList( _id);
        return res.status(200).json(data);
    });
}