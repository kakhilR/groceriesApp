import mongoose from 'mongoose';
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: String,
    password: String,
    salt:String,
    phone:String,
    address:[
        {
            type: Schema.Types.ObjectId, ref:'address', require: true
        }
    ],
    cart:[{
        product:{
            _id:{ type:String, require: true},
            name:{ type:String},
            banner:{ type:String},
            price:{ type:Number}
        },
        unit:{ type:Number, require: true}
    }],
    wishlist:[
        {
            _id:{ type:String, require: true},
            name:{ type:String},
            description:{ type:String},
            banner:{ type:String},
            available:{ type:Boolean},
            price:{type:Number},
        }
    ],
    order:[
        {
            _id:{ type:String, require: true},
            amount:{type:String},
            date:{type:Date, default:Date.now()}
        }
    ]
},{timestamps:true});

export const UserModel = mongoose.model('user',UserSchema);