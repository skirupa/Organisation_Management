const router = require('express').Router();
const pool = require('../database');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require('../middleware/validInfo');
const authorisation = require('../middleware/authorisation');

router.post('/register',validInfo, async(req,res)=>{
    try {
        console.log(req.body);
        //destructure req.body
        const {name,email,password} = req.body;
        //check if user exists...if so throw error
        const user = await pool.query('select * from users where user_email = $1',[email]);
        if (user.rowCount !== 0){
            return res.status(401).json("USER ALREADY EXIST");
        }
        //bcrypt user password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password,salt);
        //enter new user into db
        const newUser = await pool.query('insert into users(user_name,user_email,user_password) values ($1,$2,$3) returning *',[name,email,bcryptPassword]);
        //res.json(newUser.rows[0]);
        //generate jwt token
        const token = jwtGenerator(newUser.rows[0].user_id);
        res.json({ token });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});
router.post('/login',validInfo, async(req,res)=>{
    try {
        //destructure req.body
        const {email, password}  = req.body;
        //check if user exist...if not throw error
        const user = await pool.query('select * from users where user_email = $1',[email]);
        if (user.rowCount == 0 ){
            return res.status(401).json("EMAIL DOES NOT EXIST");
        }
        //check if incoming password is same as database password
        const validPassword = await bcrypt.compare(password,user.rows[0].user_password);
        //console.log(validPassword); //returns bool value
        if (!validPassword){
            return res.status(401).json("EMAIL OR PASSWORD IS INCORRECT");
        }
        //give jwt token
        const token = jwtGenerator(user.rows[0].user_id);
        res.json({ token }); 
        console.log(token);
    } catch (error) {
        console.error(error.message);
        req.send(500).send('message');
    }
});

router.get('/is-verify',authorisation,async(req,res) => {
    try {
        res.json(true);
    } catch (error) {
        console.error(error.message);
        req.send(500).send('message');
    }
});

module.exports = router;