import { ShoppingRepository } from "../database/index.js";
import { FormateData } from "../utils/index.js";

// All Business logic will be here
export class ShoppingService {

    constructor(){
        this.repository = new ShoppingRepository();
    }

    async GetCart({ _id }){
        
        const cartItems = await this.repository.Cart(_id);
        return FormateData(cartItems);
    }


    async PlaceOrder(userInput){

        const { _id, txnNumber } = userInput

        const orderResult = await this.repository.CreateNewOrder(_id, txnNumber);
        // console.log(orderResult,"order result")
        return FormateData(orderResult);
    }

    async GetOrders(customerId){
        
        const orders = await this.repository.Orders(customerId);
        return FormateData(orders)
    }

    async GetOrderDetails({ _id,orderId }){
        const orders = await this.repository.Orders(productId);
        return FormateData(orders)
    }

    async ManageCart(customerId, item,qty, isRemove){

        const cartResult = await this.repository.AddCartItem(customerId,item,qty, isRemove);
        return FormateData(cartResult);
    }

    async GetOrderPayload(customerId,order,event){

        if(order){
             const payload = {
                event: event,
                data: { customerId, order }
            };
 
             return payload
        }else{
            return FormateData({error: 'No Order Available'});
        }
 
    }
 


    async SubscribeEvents(payload){
        payload = JSON.parse(payload)
        const { event, data } = payload;
        const { customerId, product, qty } = data;
        
        switch(event){
            case 'ADD_TO_CART':
                this.ManageCart(customerId,product, qty, false);
                break;
            case 'REMOVE_FROM_CART':
                this.ManageCart(customerId,product, qty, true);
                break;
            default:
                break;
        }

    }
}