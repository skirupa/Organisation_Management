const router = require('express').Router();
const pool = require('../database');
const authorisation = require('../middleware/authorisation');

router.post('/upload',authorisation,async (req,res) => {
    if(req.files === null ){
        return res.status(400).json({ msg: 'No file uploaded' });
    }
    const file = req.files.file;
    // console.log(req.body);
    // console.log(file.name);
    await file.mv(`${__dirname}/../../client/public/uploads/${file.name}`, err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        res.json({ 
            fileName: file.name, 
            filePath: `/uploads/${file.name}` 
        });
    });
    const {spent_on,spent_charges,date} = req.body;
    const query = pool.query('call insert_into_receipt($1,$2,$3,$4,$5)',[file.name,req.user,date,spent_on,spent_charges]);
});

router.get('/allreceipts',authorisation, async(req,res) => {
    try {
        const query = await pool.query('select * from receipt where emp_id=$1',[req.user]); 
        // console.log(query.rows);
        res.json(query.rows);
    } catch (error) {
        console.error(error.message);
    }
});

router.get('/allreceipts_man',async(req,res) => {
    try {
        const query = await pool.query('select * from receipt'); 
        // console.log(query.rows);
        res.json(query.rows);
    } catch (error) {
        console.error(error.message);
    }
});

router.get('/allreceipts_fin',async(req,res) => {
    try {
        console.log('log');
        const query = await pool.query('select * from receipt where approval=\'true\''); 
        // console.log(query.rows);
        res.json(query.rows);
    } catch (error) {
        console.error(error.message);
    }
});

router.post('/update_approval',async(req,res) => {
    try {
        const {approval,rid} = req.body;
        console.log(req.body);
        const query = await pool.query('update receipt set approval = $1 where rid = $2',[approval,rid]); 
    } catch (error) {
        console.log(error);
    }
});

router.post('/update_refund',async(req,res) => {
    try {
        const {refund,rid} = req.body;
        console.log(req.body);
        const query = await pool.query('update receipt set refund = $1 where rid = $2',[refund,rid]); 
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;