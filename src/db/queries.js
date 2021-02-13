const { pool } = require("./pool");

// this should probably be a middleware!
async function canUserAccessPost(postid, userid) {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * from posts WHERE id = $1",
      [postid],
      (error, result) => {
        if (error) reject(false);
        if (result.rows[0].userid === userid) {
          resolve(true);
        } else {
          reject(false);
        }
      }
    );
  });
}

function getPosts(req, res) {
  const userid = req.userid;
  pool.query(
    // "SELECT * FROM posts WHERE userid = $1 ORDER BY created_at DESC",
    `SELECT id, posts.title, posts.body, posts.created_at, posts.updated_at, t.tag_array 
      FROM posts 
      JOIN(
        SELECT pt.post_id AS id, ARRAY_AGG(t.tag) AS tag_array
        FROM posts_to_tags pt
        JOIN tags t ON t.id = pt.tag_id
        GROUP BY pt.post_id
      ) t USING (id)  ;`[userid],
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
  const userid = req.userid;
  pool.query("SELECT * from posts WHERE id = $1", [id], (error, result) => {
    if (error) throw error;
    if (result.rows.length == 0) {
      return res.status(400).json({ message: "Post not found" });
    }
    if (userid === result.rows[0].userid) {
      res.status(200).json(result.rows);
    } else res.status(403).json({ message: "Not authorized to access post" });
  });
}

function createPost(req, res) {
  const { title, body } = req.body;
  if (!title) res.status(400).send({ message: "Must have title" });
  if (!body) res.status(400).send({ message: "Must have body" });
  const userid = req.userid;
  pool.query(
    "INSERT INTO posts (title, body, userid, created_at) VALUES ( $1, $2, $3, NOW() )  RETURNING *",
    [title, body, userid],
    (error, result) => {
      if (error) throw error;
      const id = result.rows[0].id;
      res.status(200).json({ id });
    }
  );
}

async function updatePost(req, res) {
  const id = parseInt(req.params.id);
  const { title, body } = req.body;
  if (!title) res.status(400).send({ message: "Must have title" });
  if (!body) res.status(400).send({ message: "Must have body" });
  const userid = req.userid;
  canUserAccessPost(id, userid)
    .then((_) => {
      pool.query(
        "UPDATE posts SET title = $1, body = $2, updated_at = NOW() WHERE id = $3   RETURNING *",
        [title, body, id],
        (error, result) => {
          if (error) throw error;
          const id = result.rows[0].id;
          res.status(200).json({ id });
        }
      );
    })
    .catch((err) => {
      res.status(403).json({ message: "Not authorized to update post" });
    });
}

async function deletePost(request, response) {
  const id = parseInt(request.params.id);
  const userid = request.userid;
  canUserAccessPost(id, userid)
    .then((_) => {
      pool.query("DELETE FROM posts WHERE id = $1", [id], (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).send(`Post deleted with ID: ${id}`);
      });
    })
    .catch((err) => {
      response.status(403).json({ message: "Not authorized to delete post" });
    });
}

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
