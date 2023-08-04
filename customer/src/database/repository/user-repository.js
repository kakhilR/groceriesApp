import { AddressModel, CustomerModel } from '../models/index.js';

export class UserRepository{

    async CreateUser({email,password,phone,salt}){
        const user = new CustomerModel({email,password,phone,salt,address:[]})
        const _user = await user.save();
        return _user;
    }

    async CreateAddress({_id,street,postalCode,city,country}){
        const profile = await CustomerModel.findById(_id);
        if(profile){
            const newAddress = new AddressModel({street,postalCode,city,country})
            await newAddress.save();
            return await profile.save();
        }
    }

    async FindUser({email}){
        const existingUser = await CustomerModel.findOne({email:email});
        return existingUser;
    }

    // async FindUserProfile({id}){
    //     const existingUser = await CustomerModel.findBY({id});
    //     return existingUser;
    // }

    async FindUserById({id}){
        // console.log(id,"existing user id")
        const {_id} =id;
        const existingUser = await CustomerModel.findById(_id).populate('address');
        // console.log(existingUser,"existing user")
        return existingUser;
    }
     async WishList(customerId){
        const profile = await CustomerModel.findById(customerId).populate('wishlist');
        return profile.wishlist;
     }

     async AddWishList(data){
        const { customerId, product} = data;
    
        const profile = await CustomerModel.findById(customerId).populate('wishlist');
        
        if(profile){
            let wishlist = profile.wishlist
            if(wishlist.length>0){
                let isExist = false;
                wishlist.map(item=>{
                    if(item._id.toString()===product._id.toString()){
                        const index = wishlist.index(item);
                        wishlist.splice(index,1);
                        isExist = true;
                    }
                })
                if(!isExist){
                    wishlist.push(product);
                }
            }else{
                wishlist.push(product);
            }
            const _profile = await profile.save();
            return _profile.wishlist;
        }
     }

     async AddCartItem(customerId,{_id,name,price,banner},qty,isRemove){
        const profile = await CustomerModel.findById(customerId).populate('cart');

        if(profile){
            const cartItem={
                product:{_id,name,price,banner},
                unit:qty
            }
            
            let cartItems = profile.cart;
            if(cartItems.length>0){
                let isExit = false;
                cartItems.map(item=>{
                    if(item.product._id.toString()===_id.toString()){
                        if(isRemove){
                            cartItems.splice(cartItems.indexOf(item),1);
                        }else{
                            item.unit = qty;
                        }
                        isExit = true;
                    }
                })

                if(!isExit){
                    cartItems.push(cartItem);
                }
            }else{
                cartItems.push(cartItem);
            }
            profile.cart = cartItems;

            return await profile.save();
        }
        throw new Error('unable to add to cart');
    }

    async AddOrderToProfile(customerId,order){
        // console.log(order,"order")
        const profile = await CustomerModel.findById(customerId);
        // console.log(profile,"from add order to profile")

        if(profile){
            if(profile.order == undefined){
                profile.order = [];
            }
            profile.order.push(order);

            profile.cart = [];
            const _profile = await profile.save()

            return _profile;
        }

        throw new Error('unable to add to cart');
    }

}