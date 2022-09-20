require('dotenv').config();
const employeeLogin = require('../repo/login')  
const jwt = require('jsonwebtoken');


const handleLogin = (req, res) => {

    const user = {
        "email":`%${req.body.email}%`,
        "password":`%${req.body.password}%`
    };
  
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ 
        message: "Credentials are required" 
        });
    }
        employeeLogin.findEmployee(req.body, (result) => {
        console.log(result);
        payload = JSON.parse(JSON.stringify(result))[0];

        if (result.length) {
            const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
            res.json({result, accessToken});
        }
        else {
            return res.status(404).json({
                "status":404,
                "statusText":"Not Found",
                "message":"Email or password does not exist"
            })
        }   
    });
};


module.exports = {handleLogin};

