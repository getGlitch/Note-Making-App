const mongoose = require("mongoose");
const connectToDb = async()=>{
   
    try{
        const response = await mongoose.connect(process.env.MONGO_CONNECT);
        if(response){
         console.log("Mongo DB connection successful....");
        }else{
         console.log("Databse connection failed...");
        }
    }catch(error){
        console.log(error);
    }
    
   
}

module.exports = connectToDb;