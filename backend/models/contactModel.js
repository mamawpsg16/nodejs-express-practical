import mongoose from "mongoose";

const schema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
    },
    name:{
        type:String,
        required:[true, "Please add contact name"]
    },
    email:{
        type:String,
        required:[true, "Please add email address"]
    },
    phone:{
        type:String,
        required:[true, "Please add phone number"]
    }
}, {
    timestamps:true
})

export default mongoose.model("Contact", schema);