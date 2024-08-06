const mongoose =require("mongoose");
const Detail=mongoose.Schema({
    webName:String,
    // webIconUrl:String,
    links:[
        {
        label:String,
        url:String,
        },
        
],
    
})

module.exports=mongoose.model("detail",Detail)