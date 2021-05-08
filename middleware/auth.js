const jwt = require('jsonwebtoken')
const config = require('config')
module.exports = function (req , res , next){
    // get token from the header
    const token = req.header('x-auth-token');

    // if there is no token 
    if(!token){
        return res.status(401).json({msg : "No token authorization denied"})
    }

    // verify the token 

    try{
        const decoded = jwt.verify(token ,config.get("jwtSecret"))
      //  console.log(token)
      // console.log(decoded)
      // console.log(decoded.user)
        req.user = decoded.user
        //console.log(req.user)
        next()
    } catch(err){
        res.status(401).json({
            msg: "Token is Not Valid"
        })
    }
}