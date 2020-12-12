const Pool = require("pg").Pool;
// var dotenv = require("dotenv");

// dotenv.config();
console.log(process.env.DATABASE_URL);
const pool = new Pool({
  connectionString: `${process.env.DATABASE_URL}?sslmode=require`,
});

module.exports = { pool };
