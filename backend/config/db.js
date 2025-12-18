import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://roobanvignesh2002:Rooban2002@cluster0.qoo4g.mongodb.net/food-del').then(()=>console.log("DB Connected"));

}