import { configurations } from '../config/index.js';
import { userAuth } from '../middlewares/auth.js';
import { ProductService } from '../services/index.js';
import { publishMessage } from '../utils/index.js';


export const      productApiServices = (app, channel) => {
    const service = new ProductService();
  
    app.post("/product/create", async (req, res, next) => {
      const { name, desc, type, unit, price, available, supplier, banner } =
        req.body;
      // validation
      const { data } = await service.CreateProduct({
        name,
        desc,
        type,
        unit,
        price,
        available,
        supplier,
        banner,
      });
      return res.json(data);
    });
  
    app.get("/category/:type", async (req, res, next) => {
      const type = req.params.type;
  
      try {
        const { data } = await service.GetProductsByCategory(type);
        return res.status(200).json(data);
      } catch (error) {
        return res.status(404).json({ error });
      }
    });
  
    app.get("/:id", async (req, res, next) => {
      const productId = req.params.id;
  
      try {
        const { data } = await service.GetProductDescription(productId);
        return res.status(200).json(data);
      } catch (error) {
        return res.status(404).json({ error });
      }
    });
  
    // app.post("/:id", async (req, res, next) => {
    //   const { ids } = req.body;
    //   const products = await service.GetSelectedProducts(ids);
    //   return res.status(200).json(products);
    // });
  
    //get Top products and category
    app.get("/",userAuth, async (req, res, next) => {
      //check validation
      try {
        console.log("from get product")
        const { data } = await service.GetProducts();
        return res.status(200).json(data);
      } catch (error) {
        return res.status(404).json({ error });
      }
    })

    app.put('/wishlist', userAuth, async (req,res,next)=>{
      const { _id } = req.user;
      console.log('received data from wishlist');
      try{
        const {data} = await service.GetProductPayload(_id,{productId: req.body._id},'ADD_TO_WISHLIST')
        console.log(JSON.stringify(data),"data")
        // PublishUserEvent(data);
        publishMessage(channel, configurations.CUSTOMER_BINDING_KEY, JSON.stringify(data));
    
        return res.status(200).json(data.data.product)
      }catch(error){return res.json(error)}
    })

    // app.delete('/wishlist/:id',userAuth,async (req,res,next)=>{
    //   const {_id} = req.user;
    //   const productId = req.params.id;
    //   try{
    //     const { data } = await service.GetProductPayload(_id, { productId }, 'REMOVE_FORM_WISHLIST')
    //     PublishUserEvent(data);
    //     return res.status(200).json(data.data.product);
    //   }catch(error){
    //     return res.json(error);
    //   }
    // })

    app.put('/cart', userAuth, async (req,res,next)=>{
      const {_id} =req.user;
      try{
        const {data} = await service.GetProductPayload(_id, {productId: req.body._id, qty:req.body.qty},'ADD_TO_CART')

        // PublishUserEvent(data);
        publishMessage(channel, configurations.CUSTOMER_BINDING_KEY,JSON.stringify(data));
        // PublishShoppingEvent(data);
        publishMessage(channel, configurations.SHOPPING_BINDING_KEY,JSON.stringify(data));

        const response = {
          product:data.data.product,
          unit:data.data.qty
        }

        return res.status(200).json(response);
      }catch(error){
        return res.status(400).json(error)
      }
    })

    // app.delete('/cart/:id',userAuth,async (req,res,next)=>{
    //   const {_id}= req.user;
    //   const productId = req.params.id;

    //   try{
    //     const {data} = await service.GetProductPayload(_id, {productId},'REMOVE_FROM_CART');
    //     PublishUserEvent(data);
    //     PublishShoppingEvent(data);
    //     const response = {
    //       product:data.data.product,
    //       unit:data.data.qty
    //     }

    //     return res.status(200).json(response);

    //   }catch(error){
    //     return res.status(400).json(error)
    //   }
    // })

};