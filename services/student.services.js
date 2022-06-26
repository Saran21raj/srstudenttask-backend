const db=require("../mongo");
const bcrypt=require("bcrypt");


const services={
    async resetPassword(req,res){
        try
        {
                const salt=await bcrypt.genSalt(10)
                req.body.newPassword=await bcrypt.hash(req.body.newPassword,salt);
                await db.employeeaccounts.findOneAndUpdate({ empId:req.body.employeeId}, { $set: { password: req.body.newPassword} });
                res.send({msg:"password Updated"});
        }
        catch(err)
        {
            res.send(err);
        }

    },
    async getTopics(req,res){
        try{
            await db.taskTopics.find({}).toArray(function(err,result){
                res.send(result);
            });
        }
        catch(err){
            console.log(err);
        }
    },
    async submitTask(req,res){
        try{
            const taskDetails={
                date:req.body.date,
                topic:req.body.topic,
                taskUrl:req.body.taskUrl,
                regNo:req.body.regNo,
                isVerified:"No",
                feedBack:"Not Updated"
            }
            await db.studentTasks.find({regNo:req.body.regNo}).toArray(function(err,result){
                var isThere=false;
                if(result.length===0){
                    db.studentTasks.insertOne(taskDetails);
                    res.send({msg:"updated"});
                }
                else
                {
                    for(let i=0;i<result.length;i++){
                        if(req.body.date===result[i].date){
                            isThere=true;
                            break;
                        }
                        else{
                            isThere=false;
                        }
                    }
                    if(isThere){
                        res.status(400).send({msg:"already Submitted"});
                    }
                    else
                    {
                        db.studentTasks.insertOne(taskDetails);
                        res.send({msg:"updated"});
                    }
                }
            });
        }
        catch(err){
            console.log(err);
        }
    },
    async viewOldTasks(req,res){
        try{
            await db.studentTasks.find({regNo:req.body.regNo,date:req.body.date}).toArray(function(err,result){
                if(result.length===0){
                    res.status(400).send({msg:"No Record Found"});
                }
                else{
                    res.send(result);
                }
            });
        }
        catch(err){
            console.log(err);
        }
    }
}

module.exports=services;