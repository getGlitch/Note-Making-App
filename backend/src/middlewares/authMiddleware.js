const jwt = require("jsonwebtoken");

const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({message:"Access Denied, no token found"})
    }
    const token = authHeader.split(" ")[1];
    if(!token){
        return res.status(401).json({message:"Access Denied, no token found"})
    }
try {
    const jwtVerifiedData = jwt.verify(token,process.env.JWT_SECRET);
    req.user = jwtVerifiedData;
    next()
} catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
}
    

}

module.exports = authMiddleware;