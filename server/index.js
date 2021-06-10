const express = require('express');
const app = express();
const pool = require('./database');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const authorisation = require('./middleware/authorisation');

app.use(express.json());
app.use(cors());
app.use(fileUpload());

//Upload endpoint
app.use('/receipt',require('./routes/receipt'));
//route - register and login
app.use('/auth',require('./routes/jwtAuth'));
//route - authorisation
app.use('/dashboard',require('./routes/dashboard'));

const port = 5000;
app.listen(port, ()=>{
    console.log(`Listening at port ${port}...`);
});


