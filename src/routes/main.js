const express=require('express');
const { route }=require ('express/lib/application');
const routes=express.Router();
const Detail=require("../models/Detail");
const Query = require('../models/Query');
const Booking=require("../models/Booking");
const Driver_detail=require("../models/Driver_detail");
const multer=require('multer');
const path=require('path');

routes.get("/",async (req,res)=>{
    const details= await Detail.findOne({"_id":"6422b1f953bafc9e35ded074" })
    res.render("index",{
        details:details
    });
});
routes.get("/Book", async (req,res)=>{
    const details= await Detail.findOne({"_id":"6422b1f953bafc9e35ded074" })
    res.render("Book",{
        details:details
    });
});
routes.get("/services", async (req,res)=>{
    const details= await Detail.findOne({"_id":"6422b1f953bafc9e35ded074" })
    res.render("services",{
        details:details
    });
});
routes.get("/business", async (req,res)=>{
    const details= await Detail.findOne({"_id":"6422b1f953bafc9e35ded074" })
    res.render("business",{
        details:details
    });
});
routes.get("/login", async (req,res)=>{
    const details= await Detail.findOne({"_id":"6422b1f953bafc9e35ded074" })
    res.render("login",{
        details:details
    });
});

// contact us
routes.post("/contactus",async(req,res)=>{
    console.log("form submitted")
    console.log(req.body);
    // save data to db
    try{

    const data=await Query.create(req.body);
    console.log(data);
    res.redirect("/");

    } catch(e){
       console.log(e)
       res.redirect("/")
    }
}) 


// booking details

routes.post("/Booking",async(req,res)=>{
    console.log("booking successful")
    console.log(req.body);
    // save data to db
    try{

    const data1=await Booking.create(req.body);
    console.log(data1);
    res.redirect("/");

    } catch(e){
       console.log(e)
       res.redirect("/")
    }
}) 
// // driver details
var Storage=multer.diskStorage({
    destination:"./public/uploads",
    filename:(req,file,cb)=>{
     cb(null,file.filename+"_"+Date.now()+path.extname(file.originalname))
    }
 })
 var upload= multer({
     storage:Storage
 }).fields([{name:"aadhar_F",maxCount:3},{name:"aadhar_B",maxCount:1},{name:"licence_F",maxCount:1},{name:"licence_B",maxCount:1},{name:"profile",maxCount:1},]);
 
 
 
 
 routes.post('/driver_details',upload ,function(req,res,next){
     var driverdDetails=new Driver_detail({
     vehicle:req.body.vehicle,
     gear:req.body.gear,
     name:req.body.name,
     contactno:req.body.contactno,
     email:req.body.email,
     city:req.body.city,
    age:req.body.age,
    aadhar_F:{
     data:req.files.aadhar_F[0].filename,
     contentType:'image/png',
    },
    aadhar_B:{
     data:req.files.aadhar_B[0].filename,
     contentType:'image/png',
    },
    licence_F:{
     data:req.files.licence_F[0].filename,
     contentType:'image/png',
    },
    licence_B:{
     data:req.files.licence_B[0].filename,
     contentType:'image/png',
    },
    profile:{
     data:req.files.profile[0].filename,
     contentType:'image/png',
    },
     })
     driverdDetails.save();
     res.redirect("/")
 })

// // driver details
// routes.post("/driver_details",async(req,res)=>{
//     console.log("registered successfully")
//     console.log(req.body);
//     // save data to db
//     try{

//     const data2=await Driver_detail.create(req.body);
//     console.log(data2);
//     res.redirect("/");

//     } catch(e){
//        console.log(e)
//        res.redirect("/")
//     }
// }) 



module.exports=routes;