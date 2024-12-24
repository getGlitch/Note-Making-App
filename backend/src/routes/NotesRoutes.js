const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { AddNotes, GetAllNotes, DeleteNotes, UpdateNotes } = require("../controllers/notesController");
const router = express.Router();

router.post("/add",authMiddleware, AddNotes)
router.get("/getAllNotes", authMiddleware, GetAllNotes )
router.delete("/delete/:id", authMiddleware, DeleteNotes )
router.put("/update/:id", authMiddleware, UpdateNotes )

module.exports= router;