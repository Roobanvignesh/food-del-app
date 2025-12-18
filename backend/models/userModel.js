import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}}
},{minimize:false})
// if we dont add this false in that case cartdata will not created bcoz we have not provided any data hera that's why we have added minimize false

const userModel = mongoose.models.user || mongoose.model("user",userSchema);
export default userModel;