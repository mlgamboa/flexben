require('dotenv').config();
const express = require('express');

const app = express();


app.use(express.json());



// routes
app.use('/login', require('./routes/loginRoute'));
app.use('/employee', require('./routes/employeeRoute'));
app.use('/hr',require('./routes/hrRoute'));


// Listen on Port
const PORT = process.env.PORT || 4242;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});