import mysql from "mysql2";

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "Dhanuka321!@",
  database: process.env.DB_NAME || "student_management",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err);
    return;
  }
  console.log("✅ MySQL connected new version");
  connection.release();
});

// Export promise-based pool - THAT'S IT!
const db = pool.promise();
export default db;
