const { pool } = require("./pool");

function getPosts(req, res) {
  pool.query(
    "SELECT * FROM posts ORDER BY created_at DESC",
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rows);
    }
  );
}

function getPost(req, res) {
  const id = parseInt(req.params.id);

  pool.query("SELECT * from posts WHERE id = $1", [id], (error, result) => {
    if (error) throw error;
    res.status(200).json(result.rows);
  });
}

function createPost(req, res) {
  const { title, body } = req.body;
  pool.query(
    "INSERT INTO posts (title, body, created_at) VALUES ( $1, $2, NOW() )  RETURNING *",
    [title, body],
    (error, result) => {
      if (error) throw error;
      const id = result.rows[0].id;
      res.status(200).json({ id });
    }
  );
}

function updatePost(req, res) {
  const id = parseInt(req.params.id);
  const { title, body } = req.body;

  pool.query(
    "UPDATE posts SET title = $1, body = $2, updated_at = NOW() WHERE id = $3   RETURNING *",
    [title, body, id],
    (error, result) => {
      if (error) throw error;
      const id = result.rows[0].id;
      res.status(200).json({ id });
    }
  );
}

function deletePost(request, response) {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM posts WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Post deleted with ID: ${id}`);
  });
}

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
