import db from "../config/db.js";

const Auth = {
  createAdmin: (name, email, hashedPassword, callback) => {
    const query = "INSERT INTO admins (name, email, password) VALUES (?, ?, ?)";
    db.query(query, [name, email, hashedPassword], callback);
  },

  findByEmail: (email, callback) => {
    const query = "SELECT * FROM admins WHERE email = ?";
    db.query(query, [email], callback);
  },
};

export default Auth;
