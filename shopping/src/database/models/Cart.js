import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CartSchema = new Schema({
    customerId: { type: String },
    items: [
        {
            product: {
                _id: { type: String, require: true},
                name: { type: String },
                desc: { type: String },
                banner: { type: String },
                type: { type: String },
                unit: { type: Number },
                price: { type: Number },
                suplier: { type: String },
            } ,
            unit: { type: Number, require: true}
        }
    ]
});

export const CartModel =  mongoose.model('cart', CartSchema);