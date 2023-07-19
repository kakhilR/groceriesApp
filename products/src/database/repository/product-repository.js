import { ProductModel } from '../models/index.js';

export class ProductRepository {
    async CreateProduct({ name, desc, type, unit,price, available, suplier: supplier, banner }){
        const product = new ProductModel({ name, desc, type, unit,price, available, supplier, banner})

        const _product = await product.save();
        return _product;
    }

    async Products(){
        return await ProductModel.find();
    }
   
    async FindById(id){
        
       return await ProductModel.findById(id);

    }

    async FindByCategory(category){

        const products = await ProductModel.find({ type: category});

        return products;
    }

    // async FindSelectedProducts(selectedIds){
    //     const products = await ProductModel.find().where('id').in(selectedIds.map(_id => _id)).exec();
    //     return products;
    // }
}