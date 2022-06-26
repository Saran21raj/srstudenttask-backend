const route=require("express").Router();

const services=require("../services/admin.services")
    route.post("/resetpassword",services.resetPassword);
    route.post("/adminaccountcreation",services.adminAccountCreation);
    route.get("/adminlist",services.adminList);
    route.post("/studentaccountcreation",services.studentAccountCreation);
    route.get("/studentlist",services.studentList);
    route.post("/updatetopic",services.updateTopic);
    route.post("/oldtopic",services.oldTopic);
    route.get("/newtasks",services.newTasks);
    route.post("/oldtasks",services.oldTasks);
    route.post("/submitnewtask",services.submitNewTask);
    route.delete("/deletetask",services.deleteTask);
    module.exports=route;