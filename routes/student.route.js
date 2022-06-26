const route=require("express").Router();

const services=require("../services/student.services")
    route.post("/resetpassword",services.resetPassword);
    route.get("/topics",services.getTopics);
    route.post("/submittask",services.submitTask);
    route.post("/getoldtask",services.viewOldTasks);
    module.exports=route;