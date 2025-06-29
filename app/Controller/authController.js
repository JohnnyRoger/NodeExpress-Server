// authController.js

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Example: pretend this is your "database"
const users = [];

// Secret for signing JWT (in production, store securely!)
const JWT_SECRET = "supersecretkey";

exports.register = async (req, res) => {
  const { username, password } = req.body;

  // check if user exists
  const existingUser = users.find((u) => u.username === username);
  if (existingUser) {
    return res.status(400).json({ message: "Username already exists" });
  }

  // hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // save user to in-memory store
  users.push({ username, password: hashedPassword });

  res.status(201).json({ message: "User registered successfully" });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  // find user
  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // generate JWT
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });

  res.json({ token });
};
