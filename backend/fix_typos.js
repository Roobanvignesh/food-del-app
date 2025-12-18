import mongoose from "mongoose";
import foodModel from "./models/foodModel.js";

const run = async () => {
    try {
        await mongoose.connect('mongodb+srv://roobanvignesh2002:Rooban2002@cluster0.qoo4g.mongodb.net/food-del');
        console.log("DB Connected");

        const result = await foodModel.updateMany(
            { category: "Briyani" },
            { $set: { category: "Biryani" } }
        );

        console.log(`Updated ${result.modifiedCount} items from 'Briyani' to 'Biryani'`);

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await mongoose.disconnect();
        console.log("DB Disconnected");
    }
};

run();
