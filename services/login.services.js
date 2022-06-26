const db=require("../mongo");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

const JWT_KEY=process.env.JWT_SECRET_KEY;

const services={
    async admin(req,res)
    {
        try
        {
            // Checking wheather user exists or not
            const admin=await db.admin.findOne({userName: req.body.userName});
            if(!admin){
                return res.status(400).send({error:"User Doesn't Exits"});
            }
            const isValid=await bcrypt.compare(req.body.password,admin.password);
            if(!isValid)
                return res.status(403).send({error:"Username & Password Doesnt match"})
                const token=jwt.sign({adminId: admin._id},JWT_KEY);
                const userName=admin.userName;
                const name=admin.name;
                res.send({token,userName,name});
                // console.log("SIGGNEDIN");
        }
        catch(err)
        {
            res.sendStatus(500);
        }
    },
    async student(req,res)
    {
        try
        {
            // Checking wheather user exists or not
            const student=await db.studentsAccount.findOne({username: req.body.userName});
            if(!student){
                return res.status(400).send({error:"User Doesn't Exits"});
            }
            const isValid= await bcrypt.compare(req.body.password,student.password);
            if(!isValid)
                return res.status(403).send({error:"Username & Password Doesnt match"})

                const token=jwt.sign({studentId: student._id},JWT_KEY);
                // const details=jwt.verify(token,process.env.JWT_SECRET_KEY);
                const regNo= student.regNo;
                const name=student.name;
                res.send({token,regNo,name});
        }
        catch(err)
        {
            res.sendStatus(500);
        }
    }
}

module.exports=services;