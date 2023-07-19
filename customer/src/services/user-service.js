import { UserRepository } from '../database/repository/user-repository.js';
import { FormateData, GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } from '../utils/index.js';

export class UserService {

    constructor(){
        //  here we are creating the instance of user repository
        this.repository = new UserRepository();
    }

    async SignIn(userInputs){
        const { email, password } = userInputs;

        const existingUser = await this.repository.FindUser({ email });

        if(existingUser){
            const validPassword = await   ValidatePassword(password, existingUser.password,existingUser.salt);
            if(validPassword){
                const token = await GenerateSignature({ email:existingUser.email, _id: existingUser._id})
                console.log(token,"token");
                return FormateData({id:existingUser._id,token});
            }
        }
        return FormateData(null);
    }

    async SignUp(userInput){
        const { email, password, phone } = userInput;

        let salt = await GenerateSalt();

        let userPassword = await GeneratePassword(password, salt);
        const existingUser = await this.repository.CreateUser({email,password:userPassword,phone,salt})

        const token = await GenerateSignature({email:email,_id:existingUser._id});
        return FormateData({id:existingUser._id,token});
    }

    async GetProfile(id){
        const existingUser = await this.repository.FindUser({id});
        return FormateData(existingUser);
    }

    async GetShoppingDetails(id) {
        const existingUser = await this.repository.FindUserById({id});
        if(existingUser){
            return FormateData(existingUser);
        }
        return FormateData({msg:'Error'});
    }

    async GetWishList(userId){
        const wishListItems = await this.repository.WishList({userId});
        return FormateData(wishListItems);
    }

    async AddToWishList(userId, product){
        const wishListItems = await this.repository.AddToWishList({userId, product});
        return FormateData(wishListItems);
    }

    async ManageCart(userId, product,qty,isRemove){
        const cart = await this.repository.AddToCart(userId, product,qty,isRemove);
        return FormateData(cart);
    }

    async ManageOrder(userId, order){
        const _order = await this.repository.AddOrderToProfile(userId, order);
        return FormateData(_order);
    }

//  this subscribe event is a kind of function which is going to take care
// the communication with other services
// other services will call our customer service then customer service will perform some kind of operations with help of maybe http call or webhook
    async SubscribeEvents(payload){
        const {event, data} = payload;

        const { userId, product, order, qty } = data;

        switch(event){
            case 'ADD_TO_WISHLIST':
            case 'REMOVE_FROM_WISHLIST':
                this.AddToWishList(userId,product)
                break;
            case 'ADD_TO_CART':
                this.ManageCart(userId,product,qty,false);
                break;
            case 'REMOVE_FROM_CART':
                this.ManagerCart(userId,product,qty,true);
                break;
            case 'CREATE_ORDER':
                this.ManageOrder(userId,order);
                break;
            case 'TEST':
                console.log("from subscriber events");
                break;
            default:
                break;
        }
    }
}