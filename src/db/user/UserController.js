const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // used to create, sign, and verify tokens
const { pool } = require("../pool");

function createUser(req, res) {
  const { name, email, password } = req.body;
  if (!name) throw new Error("Name is required");
  if (!email) throw new Error("Email is required");
  if (!password) throw new Error("Password is required");
  const hashedPass = bcrypt.hashSync(password, 8);
  pool.query(
    "INSERT INTO users (name, email, password, registered_at) VALUES ( $1, $2, $3, NOW() )  RETURNING *",
    [name, email, hashedPass],
    (error, result) => {
      if (error) throw error;
      const { userid, name } = result.rows[0];

      const token = jwt.sign({ id: userid }, process.env.SECRET, {
        expiresIn: 60 * 60 * 24 * 7, // expires in 7 days
      });
      res
        .cookie("authToken", token, {
          maxAge: 60 * 60 * 24 * 7,
          httpOnly: true,
        })
        .status(200)
        .send({ auth: true, name });
    }
  );
}

function loginUser(req, res) {
  const { email, password } = req.body;
  if (!email)
    res.status(400).json({ auth: false, message: "Email is required" });
  if (!password)
    res.status(400).json({ auth: false, message: "Password is required" });
  pool.query(
    "SELECT * from users WHERE email = $1",
    [email],
    (error, result) => {
      if (error) throw error;
      const user = result.rows[0];
      if (!user) {
        return res.status(404).json({ auth: false, message: "Unable to auth" });
      }

      const passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) {
        return res.status(404).json({ auth: false, message: "Unable to auth" });
      }

      const token = jwt.sign({ id: user.userid }, process.env.SECRET, {
        expiresIn: 60 * 60 * 24 * 7, // expires in 7 days
      });

      res
        .cookie("authToken", token, {
          maxAge: 60 * 60 * 24 * 7,
          httpOnly: true,
        })
        .status(200)
        .send({ auth: true, name: user.name });
    }
  );
}

function getUser(req, res) {
  const { userid } = req;
  pool.query(
    "SELECT * from users WHERE userid = $1",
    [userid],
    (error, result) => {
      if (error) throw error;
      const user = result.rows[0];
      if (!user) throw new Error("No user found");
      delete user.password;
      res.status(200).send(user);
    }
  );
}

module.exports = {
  createUser,
  loginUser,
  getUser,
};
