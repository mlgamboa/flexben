const jwt = require("jsonwebtoken");
require("dotenv").config();


const verifyHRJWT = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if(!authHeader) return res.sendStatus(401);


    jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403); 
        req.user = decoded.email;
        hr = decoded.role
        console.log(decoded);
        if(hr === 'HR'){
            next();
        }
        else {
            return res.sendStatus(403);
    }
  });
}

module.exports = verifyHRJWT;