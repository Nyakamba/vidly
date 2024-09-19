const { User, validate } = require("../models/user");
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email });
  if (user) return res.status(400).send("User already registered.");

  const hashedPassword = await bcrypt.hash(password, 10);

  user = new User({
    name,
    email,
    password: hashedPassword,
  });

  await user.save();

  res.send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
