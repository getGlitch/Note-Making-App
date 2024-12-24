const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const body_parser=require("body-parser");
const connectToDb = require("./database/dbconnection");
const AuthRoutes = require("./routes/AuthRoutes.js");
const NotesRoutes = require("./routes/NotesRoutes.js")
const app = express();

app.use(body_parser.json());
app.use(cors());
connectToDb();
const PORT = process.env.PORT || 8000;

app.use("/auth",AuthRoutes);
app.use("/notes", NotesRoutes);
app.get("/",(req,res)=>{
    res.send("Welcome User...");
});


app.listen(PORT,()=>{
    console.log("Server is running on http://localhost:"+PORT);
})
