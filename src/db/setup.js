const { pool } = require("./pool");

function initDatabse() {
  pool.query(
    "CREATE TABLE posts (ID SERIAL PRIMARY KEY, created_at TIMESTAMP, updated_at TIMESTAMP, title TEXT, body TEXT)",
    (error, result) => {
      if (error) throw error;
      console.log("Table posts Created");
    }
  );
}

initDatabse();
