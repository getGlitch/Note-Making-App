const Joi = require("joi");

const signUpValidation = (req,res,next)=>{
    try {
        const schema = Joi.object({
            username:Joi.string().min(3).max(100).required(),
            email:Joi.string().email().required(),
            password:Joi.string().min(3).max(50).required()
        })
        const {error} = schema.validate(req.body);
        if(error){
            return res.status(400).json({message:"Bad Request", error})
        }
        next();
    } catch (error) {
        console.log(error);
    }
    
}

const loginValidation = (req,res,next)=>{
    try {
        const schema = Joi.object({
            email:Joi.string().email().required(),
              password:Joi.string().min(3).max(50).required()
          })
          const {error} = schema.validate(req.body);
          if(error){
              return res.status(400).json({message:"Bad Request", error})
          }
          next();
        
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = {signUpValidation, loginValidation};
