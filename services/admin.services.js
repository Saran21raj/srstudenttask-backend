const db=require("../mongo");
const bcrypt=require("bcrypt");
const {ObjectId} = require("mongodb");

const services={
    async resetPassword(req,res){
        try
        {
                const salt=await bcrypt.genSalt(10)
                req.body.newPassword=await bcrypt.hash(req.body.newPassword,salt);
                await db.admin.findOneAndUpdate({ userName:req.body.userName}, { $set: { password: req.body.newPassword} });
                res.send({msg:"password Updated"});
        }
        catch(err)
        {
            res.send(err);
        }

    },
    async adminAccountCreation(req,res)
    {
        try
        {   //Request body validation
            const count= await db.admin.count();
            if(count<=3)
            {
                const user=await db.admin.findOne({username: req.body.userName});
                if(user)
                {
                    return res.status(400).send({msg:"username already registered"});
                }
                else
                {
                    const salt=await bcrypt.genSalt(10)
                    req.body.password=await bcrypt.hash(req.body.password,salt);
                    //  inserting new data
                    const details={
                        name:req.body.name,
                        userName:req.body.userName,
                        password:req.body.password,
                    }
                    await db.admin.insertOne(details);
                    res.send({mes:"Admin Registered Successfully"})
                }
            }
            else
            {
                res.status(400).send({msg:"admin count reached"})
            }
            
        }
        catch(err)
        {
            console.log("Error ",err);
            res.sendStatus(500);
        }
    },
    async adminList(req,res){
        try{
            await db.admin.find({}).toArray(function(err, result) {
                if (err) throw err;
                res.send(result);
              });
        }
        catch(err)
        {
            res.send(err);
        }
    },
    async studentAccountCreation(req,res)
    {
        try
        {   //Request body validation
            const count= await db.studentsAccount.count();
            console.log("count",count);
            const user=await db.studentsAccount.findOne({username: req.body.userName});
            if(user)
            {
                return res.status(400).send();
            }
            else
            {
                const salt=await bcrypt.genSalt(10)
                req.body.password=await bcrypt.hash(req.body.password,salt);
                //  inserting new data
                const regNo=`Id${count+3}`;
                const details={
                    name:req.body.name,
                    username:req.body.userName,
                    password:req.body.password,
                    regNo:regNo,
                }
                await db.studentsAccount.insertOne(details);
                console.log("User Registered Successfully");
                res.send({mes:"User Registered Successfully"})
            }
        }
        catch(err)
        {
            console.log("Error ",err);
            res.sendStatus(500);
        }
    },
    async studentList(req,res){
        try{
            await db.studentsAccount.find({}).toArray(function(err, result) {
                if (err) throw err;
                console.log(result);
                res.send(result);
              });
        }
        catch(err)
        {
            console.log("error",err);
        }
    },
    async updateTopic(req,res){
        try{
            await db.taskTopics.find({}).toArray(function(err,result){
                var isThere=true;
                for(let i=0;i<result.length;i++){
                    if(req.body.date===result[i].date)
                    {
                        isThere=true;
                        break;
                    }
                    else{
                        isThere=false;
                    }
                }
                if(isThere)
                {
                    // console.log("already there");
                    res.status(400).send({msg:"update clear date"});
                }
                else
                {
                    db.taskTopics.insertOne(req.body);
                    res.send({msg:"updated"});
                    // console.log("NOPe");
                }
            });
        }
        catch(err){
            console.log(err);
        }
        
    },
    async oldTopic(req,res){
        try{
            await db.taskTopics.find({date:req.body.date}).toArray(function(err,result){
                if(result.length===0){
                    res.status(400).send();
                }
                else{
                    res.send(result[0]);
                }
            });
            // console.log(req.body);
        }
        catch(err){
            console.log(err);
        }
    },
    async newTasks(req,res){
        try{
            await db.studentTasks.find({isVerified:"No"}).toArray(function(err,result){
                if(result.length===0){
                    res.status(400).send({msg:"No New Tasks Found"});
                }
                else{
                    res.send(result);
                }
            });
        }
        catch(err){
            console.log(err);
        }
    },
    async oldTasks(req,res){
        try{
            await db.studentTasks.find({isVerified:"Yes",date:req.body.date}).toArray(function(err,result){
                if(result.length===0){
                    res.status(400).send({msg:"No New Tasks Found"});
                }
                else{
                    res.send(result);
                }
            });
        }
        catch(err){
            console.log(err);
        }
    },
    async submitNewTask(req,res){
        try{
            await db.studentTasks.findOneAndUpdate({_id:ObjectId(req.body._id)},
                {$set:{ isVerified: "Yes", feedBack:req.body.feedBack}},
                );
            res.send({msg:"Updated"});
        }
        catch(err){
            console.log(err);
        }
    },
    async deleteTask(req,res){
        try{
            await db.studentTasks.deleteOne({_id: ObjectId(req.body._id) });
            res.send({msg:"Deleted"});
        }
        catch(err){
            console.log(err);
        }
    }
}

module.exports=services;