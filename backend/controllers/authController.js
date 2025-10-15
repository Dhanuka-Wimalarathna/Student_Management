import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/db.js";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export const register = (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const query = "INSERT INTO admins (name, email, password) VALUES (?, ?, ?)";
  db.query(query, [name, email, hashedPassword], (err) => {
    if (err)
      return res.status(500).json({ message: "Database error", error: err });
    res.json({ message: "User registered successfully" });
  });
};

export const login = (req, res) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM admins WHERE email = ?";

  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (results.length === 0)
      return res.status(404).json({ message: "User not found" });

    const user = results[0];
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ message: "Login successful", token });
  });
};
