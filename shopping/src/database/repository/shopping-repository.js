import { CartModel, OrderModel } from "../models";

class ShoppingRepository {

    async Orders(userId){
        const orders = await OrderModel.find({userId: userId});
        return orders;
    }

    async Cart(userId){
        const cartItems = await CartModel.find({userId: userId});

        if(cartItems){
            return cartItems;
        }

        throw new Error('Data Not found');
    }

    async AddCartItem(userId,item,qty,isRemove){
        const cart = await CartModel.findOne({userId:userId});

        const {_id} = item;

        if(cart){
            let cartItems = cart.items;

            let isExist = false;

            if(cartItems.length>0){
                cartItems.map(item=>{
                    if(item.product._id.toString() === _id.toString()){
                        if(isRemove){
                            cartItems.splice(cartItems.indexOf(item),1);
                        }else{
                            item.unit = qty;
                        }
                        isExist = true;
                    }
                })
            }

            if(!isExist && !isRemove){
                cartItems.push({product:{...item}, unit:qty});
            }

            cart.items = cartItems;

            return await cart.save();
        }else{
            return  await CartModel.create({
                userId,
                items:[{ products:{...item}, unit:qty}]
            })
        }
    }

    async CreateNewOrder(userId, txnId){
        const cart = await CartModel.findOne({ userId: userId});

        if(cart){

            let amount =0;

            let cartItems = cart.items;
            if(cartItems.length>0){
                cartItems.map(item=>{
                    amount += parseInt(item.product.price) * parseInt(item.unit);
                })

                const orderId = uuid4();

                const order = new OrderModel({ orderId, userId, amount, status:'received', items:cartItems})

                cart.items = [];

                const _order= await order.save();
                await cart.save();
                return _order;
            }
        }
        return {};
    }
}

module.exports = ShoppingRepository;