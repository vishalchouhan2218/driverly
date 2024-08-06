const mongoose=require("mongoose");
const Query=mongoose.Schema({
    name:String,
    email:String,
    message:String
})
module.exports=mongoose.model("queries",Query);
