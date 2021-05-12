const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

//route - register and login
app.use('/auth',require('./routes/jwtAuth'));
//route - authorisation
app.use('/dashboard',require('./routes/dashboard'));

const port = 5000;
app.listen(port, ()=>{
    console.log(`Listening at port ${port}...`);
});

