import db from "../config/db.js";

const Student = {
  create: (studentData, callback) => {
    const sql = `
      INSERT INTO students 
      (firstName, lastName, fullName, address, nic, phone, enrollmentDate, vehicleCategory)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(
      sql,
      [
        studentData.firstName,
        studentData.lastName,
        studentData.fullName,
        studentData.address,
        studentData.nic,
        studentData.phone,
        studentData.enrollmentDate,
        studentData.vehicleCategory,
      ],
      callback
    );
  },

  getAll: (callback) => {
    db.query("SELECT * FROM students", callback);
  },

  // Check if NIC already exists
  findByNIC: (nic, callback) => {
    db.query("SELECT id FROM students WHERE nic = ?", [nic], callback);
  },
};

export default Student;
