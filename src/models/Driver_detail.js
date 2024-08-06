const mongoose=require("mongoose");
const Driver_detail=mongoose.Schema({
    vehicle:String,
    gear:String,
    name:String,
    contactno:Number,
    email:String,
    city:String,
   age:Number,
   aadhar_F:{
    data:Buffer,
    contentType:String,
   },
   licence_B:{
    data:Buffer,
    contentType:String,
   },
   licence_F:{
    data:Buffer,
    contentType:String,
   },
   licence_B:{
    data:Buffer,
    contentType:String,
   },
   profile:{
    data:Buffer,
    contentType:String,
   },
   

})

module.exports=mongoose.model("driver_details",Driver_detail);