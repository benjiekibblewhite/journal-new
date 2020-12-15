const { pool } = require("./pool");

function initDatabse() {
  pool.query(
    "CREATE TABLE posts (ID SERIAL PRIMARY KEY, created_at TIMESTAMP, updated_at TIMESTAMP, title TEXT, body TEXT, FOREIGN KEY (userID) REFERENCES USERS (userID))",
    (error, result) => {
      if (error) console.error(error);
      console.log("Table posts Created");
    }
  );

  pool.query(
    "CREATE TABLE users (userID SERIAL PRIMARY KEY, registered_At TIMESTAMP, name TEXT, email TEXT UNIQUE, password TEXT)",
    (error, result) => {
      if (error) console.error(error);
      console.log("Table users Created");
    }
  );
}

function addUsers() {
  pool.query("ALTER TABLE posts ADD userID INTEGER", (error, result) => {
    if (error) console.error(error);
    console.log("userID column added to posts");
  });
  pool.query(
    "ALTER TABLE posts ADD FOREIGN KEY (userID) references users(userID);",
    (error, result) => {
      if (error) console.error(error);
      console.log("userID foreign key added to posts");
    }
  );

  pool.query(
    "CREATE TABLE users (userID SERIAL PRIMARY KEY, registered_At TIMESTAMP, name TEXT, email TEXT, password TEXT)",
    (error, result) => {
      if (error) console.error(error);
      console.log("Table users Created");
    }
  );
}
addUsers();
// initDatabse();
