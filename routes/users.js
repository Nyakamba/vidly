const _ = require("lodash");
const bcrypt = require("bcryptjs");
const express = require("express");
const { User, validate } = require("../models/user");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

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

  const token = user.generateAuthToken();

  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
