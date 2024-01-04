import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
    products : [
        {
            type : mongoose.ObjectId,
            ref : 'Products',
        }
    ],

    payment : {},
    buyer: {
        type: mongoose.ObjectId,
        ref: "users",
      },
    status : {
        type : String,
        default : "In-Process",
        enum : ['In-Process', 'Processing', 'Shipped', 'Delivered', 'Cancel']
    },
}, {timestamps : true})

export default mongoose.model("Order", orderSchema);