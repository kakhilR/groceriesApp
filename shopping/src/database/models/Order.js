import mongoose from "mongoose";

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    orderId: { type: String },
    customerId: { type: String },
    amount: { type: Number },
    status: { type: String },
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
},
{
    timestamps: true
});

export const OrderModel =  mongoose.model('order', OrderSchema);