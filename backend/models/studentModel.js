import db from "../config/db.js";

const Student = {
  // Create new student - using async/await
  async create(studentData) {
    const sql = `
      INSERT INTO students 
      (firstName, lastName, fullName, address, nic, phone, enrollmentDate, vehicleCategory)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute(sql, [
      studentData.firstName,
      studentData.lastName,
      studentData.fullName,
      studentData.address,
      studentData.nic,
      studentData.phone,
      studentData.enrollmentDate,
      studentData.vehicleCategory,
    ]);

    return result.insertId; // Return the new student ID
  },

  // Get all students
  async getAll() {
    const [rows] = await db.query("SELECT * FROM students ORDER BY id DESC");
    return rows; // Return all students
  },

  // Get student by ID
  async getById(id) {
    const [rows] = await db.execute("SELECT * FROM students WHERE id = ?", [
      id,
    ]);
    return rows[0]; // Return single student or undefined
  },

  // Check if NIC already exists
  async findByNIC(nic) {
    const [rows] = await db.execute("SELECT id FROM students WHERE nic = ?", [
      nic,
    ]);
    return rows[0]; // Return student if exists, otherwise undefined
  },

  // Update student
  async update(id, studentData) {
    const sql = `
      UPDATE students 
      SET firstName = ?, lastName = ?, fullName = ?, address = ?, 
          nic = ?, phone = ?, enrollmentDate = ?, vehicleCategory = ?
      WHERE id = ?
    `;

    const [result] = await db.execute(sql, [
      studentData.firstName,
      studentData.lastName,
      studentData.fullName,
      studentData.address,
      studentData.nic,
      studentData.phone,
      studentData.enrollmentDate,
      studentData.vehicleCategory,
      id,
    ]);

    return result.affectedRows > 0; // Return true if updated
  },

  // Delete student
  async delete(id) {
    const [result] = await db.execute("DELETE FROM students WHERE id = ?", [
      id,
    ]);
    return result.affectedRows > 0; // Return true if deleted
  },

  // Search students
  async search(query) {
    const [rows] = await db.execute(
      "SELECT * FROM students WHERE firstName LIKE ? OR lastName LIKE ? OR nic LIKE ? OR phone LIKE ?",
      [`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`],
    );
    return rows;
  },

  // Get students by IDs (for exam selection)
  async getByIds(ids) {
    if (!ids || ids.length === 0) return [];
    const placeholders = ids.map(() => "?").join(",");
    const [rows] = await db.execute(
      `SELECT * FROM students WHERE id IN (${placeholders})`,
      ids,
    );
    return rows;
  },
};

export default Student;
