const { pool } = require("./pool");

async function initDatabse() {
  await pool
    .query(
      "CREATE TABLE users (userID SERIAL PRIMARY KEY, registered_At TIMESTAMP, name TEXT, email TEXT UNIQUE, password TEXT)"
    )
    .catch(console.error);
  await pool
    .query(
      "CREATE TABLE posts (ID SERIAL PRIMARY KEY, created_at TIMESTAMP, updated_at TIMESTAMP, title TEXT, body TEXT, userid INT, CONSTRAINT fk_userid FOREIGN KEY (userid) REFERENCES USERS (userid))"
    )
    .catch(console.error);
}

async function addUsers() {
  await pool.query("ALTER TABLE posts ADD userID INTEGER").catch(console.error);
  await pool
    .query(
      "ALTER TABLE posts ADD FOREIGN KEY (userID) references users(userID);"
    )
    .catch(console.error);

  await pool
    .query(
      "CREATE TABLE users (userID SERIAL PRIMARY KEY, registered_At TIMESTAMP, name TEXT, email TEXT UNIQUE, password TEXT)"
    )
    .catch(console.error);
}

async function addTags() {
  await pool
    .query("CREATE TABLE tags (id SERIAL PRIMARY KEY, tag TEXT NOT NULL)")
    .catch(console.error);

  await pool.query(
    "CREATE TABLE posts_to_tags (post_id int references posts(id), tag_id int references tags(id), constraint id PRIMARY KEY (post_id, tag_id))"
  );
}

async function init() {
  await initDatabse();
  await addUsers();
  await addTags();
}

init();
