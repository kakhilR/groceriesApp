import { ProductService } from '../services/product-service';

module.exports = (app, channel) => {
    const service = new ProductService();
  
    app.post("/product/create", async (req, res, next) => {
      const { name, desc, type, unit, price, available, suplier, banner } =
        req.body;
      // validation
      const { data } = await service.CreateProduct({
        name,
        desc,
        type,
        unit,
        price,
        available,
        suplier,
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
  
    app.post("/ids", async (req, res, next) => {
      const { ids } = req.body;
      const products = await service.GetSelectedProducts(ids);
      return res.status(200).json(products);
    });
  
    
    // app.get("/whoami", (req, res, next) => {
    //   return res
    //     .status(200)
    //     .json({ msg: "/ or /products : I am products Service" });
    // });
  
    //get Top products and category
    app.get("/", async (req, res, next) => {
      //check validation
      try {
        const { data } = await service.GetProducts();
        return res.status(200).json(data);
      } catch (error) {
        return res.status(404).json({ error });
      }
    });

    app.put('/wishlist', UserAuth, async (req,res,next)=>{
      const { _id } = req.user;
      
      try{
        const {data} = await service.GetProductPayload(_is,{productId: req.body._id},'ADD_TO_WISHLIST')
        PublishUserEvent(data);
    
        return res.status(200).json(data.data.product)
      }catch(error){return res.json(error)}
    })

    app.delete('/wishlist/:id',UserAuth,async (req,res,next)=>{
      const {_id} = req.user;
      const productId = req.params.id;
      try{
        const { data } = await service.GetProductPayload(_id, { productId }, 'REMOVE_FORM_WISHLIST')
        PublishUserEvent(data);
        return res.status(200).json(data.data.product);
      }catch(error){
        return res.json(error);
      }
    })

    app.put('/cart', UserAuth, async (req,res,next)=>{
      const {_id} =req.user;
      try{
        const {data} = await service.GetProductPayload(_id, {productId: req.body._id, qty:req.body.qty},'ADD_TO_CART')

        PublishUserEvent(data);
        PublishShoppingEvent(data);
        const response = {
          product:data.data.product,
          unit:data.data.qty
        }

        return res.status(200).json(response);
      }catch(error){
        return res.status(400).json(error)
      }
    })

    app.delete('/cart/:id',UserAuth,async (req,res,next)=>{
      const {_id}= req.user;
      const productId = req.params.id;

      try{
        const {data} = await service.GetProductPayload(_id, {productId},'REMOVE_FROM_CART');
        PublishUserEvent(data);
        PublishShoppingEvent(data);
        const response = {
          product:data.data.product,
          unit:data.data.qty
        }

        return res.status(200).json(response);

      }catch(error){
        return res.status(400).json(error)
      }
    })

};