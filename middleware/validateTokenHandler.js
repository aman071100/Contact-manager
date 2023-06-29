const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async(req, res, next)=>{

    let token;
    let authtoken = req.headers.Authorization || req.headers.authorization;

    if(authtoken && authtoken.startsWith("Bearer"))
    {
        token = authtoken.split(" ")[1];
        jwt.verify(token,process.env.ACCESS_SECRET_TOKEN,(err,decoded)=>{
            if(err)
            {
                res.status(401);
                throw new Error("User is not authorized");
            }
            else{
                 req.user = decoded.user;
                 next();
            }
        })
    }

    if (!token) {
        res.status(401);
        throw new Error("User is not authorized or token is missing");
      }

});

module.exports = validateToken;