const router = require('express').Router();
const pool = require('../database');
const authorisation = require('../middleware/authorisation');

router.get('/',authorisation,async(req,res)=>{
    try {
        //req.user has the payload (a json having user_id)
        //res.json(req.user); //gives user_id
        const user = await pool.query('select * from users where user_id = $1',[req.user]);
        res.json(user.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("SERVER ERROR");
    }
});

module.exports = router;