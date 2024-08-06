const mongoose=require("mongoose");
const Booking=mongoose.Schema({
    vehicle:String,
    passenger:Number,
    location_pickup:String,
    date:String,
    location_drop:String,
    trip:String,
    package:String


})

module.exports=mongoose.model("bookings",Booking);