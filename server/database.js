const Pool = require('pg').Pool;
const pool = new Pool({
    user :"postgres",
    password : "kirukkupa",
    host : "localhost",
    port : 5432,
    database : "ORGANISATION"
});
module.exports = pool;