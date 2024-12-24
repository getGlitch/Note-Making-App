const { required } = require("joi");
const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        maxlength:100

    },
    description:{
        type:String,
        required:true,
        maxlength:500
        
    },
   userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
    required:true
   }
},{
    timestamps:true
}) 

const notes_Model = mongoose.model("notes", notesSchema);
module.exports = notes_Model;
 