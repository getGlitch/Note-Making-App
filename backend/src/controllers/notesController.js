const notes_Model = require("../database/notesModel")

const AddNotes = async(req,res)=>{
    const {title, description} = req.body;
    userId = req.user.userId;
    try {
        const newNote = new notes_Model({
            title,
            description,
            userId
        })
        await newNote.save();
        res.status(201).json({message:"Note Added 💕", success:true})
    } catch (error) {
        res.status(500).json({message:"Internal Server Error", success:false})
    }
}

const GetAllNotes = async(req, res)=>{
    userId = req.user.userId;
    try {
        const notes = await notes_Model.find({userId}).sort({ createdAt: -1 });
        if(!notes){
            return res.status(404).json({message:"Failed to fetch the notes", success:false})
        }
        res.status(200).json({message:"All notes fetched successfully", notes:notes, success:true})
    } catch (error) {
        res.status(500).json({message:"Internal Server Error", error})
    }
}

const DeleteNotes = async(req,res)=>{
    noteId = req.params.id;
    userId=req.user.userId;
    try {
      const response = await notes_Model.findByIdAndDelete({_id:noteId});
      if (!response) {
        return res.status(404).json({ message: "Note not found", success: false });
    }
    res.status(200).json({ message: "Note deleted successfully", success: true });
      
       
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});
    }
}
const UpdateNotes = async(req,res)=>{
    noteId = req.params.id;
    console.log(noteId);
    userId=req.user.userId;
    console.log(userId);
    console.log(req.body);

    try {
        
       const response = await notes_Model.findByIdAndUpdate(noteId,req.body,{ new: true });
       if (!response) {
        return res.status(404).json({ message: "Note Update Failed", success: false });
    }
    res.status(200).json({ message: "Note Updated successfully", success: true });

      
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error",error});
    }
}


module.exports = {AddNotes, GetAllNotes,DeleteNotes,UpdateNotes};



