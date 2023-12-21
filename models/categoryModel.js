import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
    name : {
        type : String,
        unique : true,
    },

    slug : {
        type : String,
        lowercase : true,
    }
})

export default mongoose.model("Category", categorySchema);