const jwt = require("jsonwebtoken");
require("dotenv").config();


const verifyEmployeeJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if(!authHeader) return res.sendStatus(401);

  jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); // invalid Token
    req.user = decoded.email;
    employee = decoded.role
    console.log(decoded);
    if(employee === 'employee'){
      next();
    }
    else {
      return res.sendStatus(403);
    }
  });
};

module.exports = verifyEmployeeJWT;