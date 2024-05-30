import mongoose from "mongoose";
export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://sannapukarthik:NARA1970@cluster0.we6hooe.mongodb.net/food-del').then(()=>console.log('DB connected'));
}