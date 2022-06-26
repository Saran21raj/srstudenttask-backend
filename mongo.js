const {MongoClient}=require("mongodb");

const MONGODB_URL=process.env.MONGODB_URL;
const MONGODB_NAME=process.env.MONGODB_DB_NAME;

const client=new MongoClient(MONGODB_URL);

module.exports={
    // All Collections
    db:null,
    //Specific Collections
    admin:null,
    studentsAccount:null,
    taskTopics:null,
    studentTasks:null,
    async connect(){
        // Connnecting to database
        await client.connect();
        console.log("Connected to Mongo:",MONGODB_URL);

        // Selecting the database
        this.db=client.db(MONGODB_NAME);
        console.log("Selected Database:",MONGODB_NAME);

        //Selecting Specific Collection
        this.admin=this.db.collection("admin");
        this.studentsAccount=this.db.collection("studentsAccount");
        this.taskTopics=this.db.collection("taskTopics");
        this.studentTasks=this.db.collection("studentTasks");
        
    }
}