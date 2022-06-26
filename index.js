require("dotenv").config();
const express=require("express");
const mongo=require("./mongo");
const jwt=require("jsonwebtoken");
const bodyParser=require("body-parser");
const cors=require("cors");
const app=express();

async function loadApp()
{
    try
    {
        //Mongo connection
        await mongo.connect();
        const loginRoutes=require("./routes/login.route");
        const adminRoutes=require("./routes/admin.route");
        const studentRoutes=require("./routes/student.route");
        app.use(cors());
        app.use(bodyParser.json());
        //common
        app.use((req,res,next)=>{
            console.log("Middleware is called");
            next();
        })
        app.use("/login",loginRoutes);
        app.use((req,res,next)=>{
            const token=req.headers["auth-token"];
            if(token){
                // res.send({msg:"token valid"})
                try{
                    const user=jwt.verify(token,process.env.JWT_SECRET_KEY);
                    // res.send(user);
                    next();
                }
                catch(err){
                    res.send({msg:"Token not Valid"});
                }
            }
            else{
                res.sendStatus(401);
            }
        })
        app.use("/admin",adminRoutes);
        app.use("/student",studentRoutes);
        app.listen(process.env.PORT,()=>console.log(`Server Started @ PORT ${process.env.PORT}`));
    }
    catch(err){
        console.log(err);
    }
}

loadApp();