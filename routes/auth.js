const express = require("express");
const bcrypt = require("bcryptjs");

const Joi = require("joi");
const _ = require("lodash");
const { User } = require("../models/user");

const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email });
  if (!user) return res.status(400).send("Invalid credentials");

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send("Invalid credentials");

  const token = user.generateAuthToken();

  res.send(token);
});

function validate(user) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  };

  return Joi.validate(user, schema);
}
module.exports = router;
