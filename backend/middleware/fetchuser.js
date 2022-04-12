var jwt = require("jsonwebtoken");
const JWT_SECRET = "TestAjit";

 const fetchuser = (req , res, next)=>{

    //Get the user from JWT token
    const token = req.header('auth-token');
    if (!token){
        res.status(401).send({error:"Please authenticate using valid token1."})
    }
    try {
        const data = jwt.verify(token,  JWT_SECRET)
    req.user = data.user;
    next();
    } catch (error) {
        console.log(error)
        res.status(401).send({error:"Please authenticate using valid token2."})
    }
    
 }

 module.exports = fetchuser