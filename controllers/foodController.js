import foodModel from "../models/foodModel.js";
import fs from 'fs';
// add food item.
const addFood=async(req,res)=>{
        let image_filename=`${req.file.filename}`;
        const {name,description,price,category}=req.body;
        const food=new foodModel({
            name:name,
            description:description,
            price:price,
            image:image_filename,
            category:category,
        })
        try{
            await food.save();
            res.json({success:true,message:'Food added'});
        }
        catch(error){
            console.log(error);
            res.json({success:false,message:'Error'});
        }
}
// all food list
const listfood=async(req,res)=>{
        try{
              const foods=await foodModel.find({});
              res.json({success:true,data:foods});
        }
        catch(error){
             console.log(error);
             res.json({success:false,message:'Error'})
        }
}
// remmove  food item
const removeFood = async (req, res) => {
    try {
      if (!req.body.id) {
        return res.json({ success: false, message: 'Food ID is required' });
      }
  
      const food = await foodModel.findById(req.body.id);
      if (!food) {
        return res.json({ success: false, message: 'Food not found' });
      }
  
      fs.unlink(`uploads/${food.image}`, () => {});
      await foodModel.findByIdAndDelete(req.body.id);
      res.json({ success: true, message: 'Food Removed' });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: 'Error' });
    }
  };
  
export {addFood,listfood,removeFood}