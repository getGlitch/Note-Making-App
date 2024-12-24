const express = require("express");
const {signUpValidation,loginValidation} = require("../middlewares/validatingUser")
const {signUp, login} = require("../controllers/authController")
const router = express.Router();

router.post("/register",signUpValidation,signUp)
router.post("/login",loginValidation, login)

module.exports = router;