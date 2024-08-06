require('dotenv').config();
const express=require('express');
const hbs=require('hbs');
const app=express();
const mongoose=require("mongoose");
const routes=require('./routes/main')
const Detail=require('./models/Detail')
const Register=require("./models/Registers")
const Query=require("./models/Query")
const bodyParser=require('body-parser');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

//  /static/css/style.css
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static',express.static("public"))
app.use("",routes);


// (template engine)

app.set('view engine','hbs')
app.set("views","views")
hbs.registerPartials("views/partials")



// / db connection
mongoose.connect("mongodb://localhost/driverly")
.then(()=>{
    console.log("db connected")
})
.catch(()=>{
    console.log("connection failed")
})

Detail.create({
        webName:"Driverly",
        links:[
            {
                label:"Home",
                url:"/"
            },
            {
                label:"Book",
                url:"/Book"
            },
            {
                label:"Services",
                url:"/services"
            },
            {
                label:"For Business",
                url:"/business"
            },
            {
                label:"Login/Signup",
                url:"/login"
            },
        ]
    })

// signup
app.post("/register", async (req,res)=>{
    try{
     const password = req.body.password;
     const confirmpassword = req.body.confirmpassword;
      
     if(password===confirmpassword){
       const registerUser= new Register({
         email : req.body.email,
         password : req.body.password,
         confirmpassword:req.body.confirmpassword
       })

       const token = await registerUser.generateAuthToken();


       const registerd= await registerUser.save();
       res.status(201).redirect("/");
     } else{
        res.send("passwords are not matching")
     }

    } catch (error){
        res.status(400).send(error);
    }
})

// login
app.post("/login", async (req,res)=>{
    try{
    const email= req.body.email;
    const password= req.body.password;

    const useremail=await Register.findOne({email:email});
    
    const isMatch =await  bcrypt.compare(password, useremail.password);
    const token = await  useremail.generateAuthToken();
    console.log(token);
    if(isMatch){
        res.status(201).redirect("/");
    } else{
        res.send("invalid login details")
    }

    } catch(error){
        res.status(400).send("invalid login details")
    }
})

// server
app.listen(process.env.PORT | 5556,()=>{
    console.log("server started")
})