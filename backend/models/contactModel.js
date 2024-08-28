import mongoose from "mongoose";

mongoose.set("strictQuery", false);
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
    },
}, 
{
    timestamps:true
})
// Define virtual properties
schema.virtual('introduction').get(function() {
    return `my name is: ${this.name} and my contact # is ${this.phone ?? "N/A"}`;
});

schema.methods.summary = function() {
  
    console.log(`Name:${this.name} Email:${this.email} Phone:${this.phone}`);
  };
  
export default mongoose.model("Contact", schema);