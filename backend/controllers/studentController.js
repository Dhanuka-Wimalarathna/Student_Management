import Student from "../models/studentModel.js";

const validateStudentData = (studentData) => {
  const errors = [];

  const requiredFields = [
    "firstName",
    "lastName",
    "fullName",
    "address",
    "nic",
    "phone",
    "enrollmentDate",
    "vehicleCategory",
  ];

  requiredFields.forEach((field) => {
    if (!studentData[field] || studentData[field].trim() === "") {
      errors.push(`${field} is required`);
    }
  });

  // Name validations
  if (studentData.firstName && !/^[A-Za-z]+$/.test(studentData.firstName)) {
    errors.push("First name should contain only letters");
  }

  if (studentData.lastName && !/^[A-Za-z]+$/.test(studentData.lastName)) {
    errors.push("Last name should contain only letters");
  }

  // NIC validation (Sri Lankan format)
  if (
    studentData.nic &&
    !/^([0-9]{9}[vVxX]|[0-9]{12})$/.test(studentData.nic)
  ) {
    errors.push("Invalid NIC format (9 digits with V/X or 12 digits)");
  }

  // Phone validation
  if (studentData.phone && !/^[0-9]{10}$/.test(studentData.phone)) {
    errors.push("Phone number must be exactly 10 digits");
  }

  if (studentData.phone && !/^(7[0-9]|0[0-9])/.test(studentData.phone)) {
    errors.push("Invalid phone number format");
  }

  // Date validation
  if (studentData.enrollmentDate) {
    const enrollmentDate = new Date(studentData.enrollmentDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time part for fair comparison

    if (enrollmentDate > today) {
      errors.push("Enrollment date cannot be in the future");
    }
  }

  return errors;
};

// Add new student
export const addStudent = async (req, res) => {
  try {
    // Backend validation
    const validationErrors = validateStudentData(req.body);

    if (validationErrors.length > 0) {
      return res.status(400).json({
        error: "Validation failed",
        details: validationErrors,
      });
    }

    // Check for duplicate NIC
    const existingStudent = await Student.findByNIC(req.body.nic);

    if (existingStudent) {
      return res.status(400).json({
        error: "Validation failed",
        details: ["NIC already exists"],
      });
    }

    // If all validations pass, create student
    const studentId = await Student.create(req.body);

    res.status(201).json({
      message: "Student added successfully",
      studentId: studentId,
      student: {
        id: studentId,
        ...req.body,
        status: "Enrolled",
      },
    });
  } catch (err) {
    console.error("Error adding student:", err);

    // Handle database-specific errors
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({
        error: "Validation failed",
        details: ["Student with same NIC or phone already exists"],
      });
    }

    res.status(500).json({
      error: "Database error",
      details: err.message,
    });
  }
};

// Get all students
export const getStudents = async (req, res) => {
  try {
    const students = await Student.getAll();
    res.json(students);
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({
      error: "Database error",
      details: err.message,
    });
  }
};

// Get student by ID
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.getById(req.params.id);

    if (!student) {
      return res.status(404).json({
        error: "Not found",
        details: ["Student not found"],
      });
    }

    res.json(student);
  } catch (err) {
    console.error("Error fetching student:", err);
    res.status(500).json({
      error: "Database error",
      details: err.message,
    });
  }
};

// Update student
export const updateStudent = async (req, res) => {
  try {
    // Check if student exists
    const existingStudent = await Student.getById(req.params.id);

    if (!existingStudent) {
      return res.status(404).json({
        error: "Not found",
        details: ["Student not found"],
      });
    }

    // If NIC is being updated, check if it already exists for another student
    if (req.body.nic && req.body.nic !== existingStudent.nic) {
      const studentWithNIC = await Student.findByNIC(req.body.nic);
      if (studentWithNIC && studentWithNIC.id != req.params.id) {
        return res.status(400).json({
          error: "Validation failed",
          details: ["NIC already exists for another student"],
        });
      }
    }

    // Validate the update data (optional - you might want partial updates)
    if (Object.keys(req.body).length > 0) {
      const validationErrors = validateStudentData({
        ...existingStudent,
        ...req.body,
      });

      if (validationErrors.length > 0) {
        return res.status(400).json({
          error: "Validation failed",
          details: validationErrors,
        });
      }
    }

    // Update student
    const updated = await Student.update(req.params.id, req.body);

    if (updated) {
      // Fetch the updated student to return
      const updatedStudent = await Student.getById(req.params.id);
      res.json({
        message: "Student updated successfully",
        student: updatedStudent,
      });
    } else {
      res.status(400).json({
        error: "Update failed",
        details: ["No changes made"],
      });
    }
  } catch (err) {
    console.error("Error updating student:", err);

    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({
        error: "Validation failed",
        details: ["Student with same NIC or phone already exists"],
      });
    }

    res.status(500).json({
      error: "Database error",
      details: err.message,
    });
  }
};

// Delete student
export const deleteStudent = async (req, res) => {
  try {
    // Check if student exists
    const existingStudent = await Student.getById(req.params.id);

    if (!existingStudent) {
      return res.status(404).json({
        error: "Not found",
        details: ["Student not found"],
      });
    }

    // Delete student
    const deleted = await Student.delete(req.params.id);

    if (deleted) {
      res.json({
        message: "Student deleted successfully",
        studentId: parseInt(req.params.id),
      });
    } else {
      res.status(400).json({
        error: "Delete failed",
        details: ["Unable to delete student"],
      });
    }
  } catch (err) {
    console.error("Error deleting student:", err);
    res.status(500).json({
      error: "Database error",
      details: err.message,
    });
  }
};

// Search students
export const searchStudents = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === "") {
      return res.status(400).json({
        error: "Validation failed",
        details: ["Search query is required"],
      });
    }

    const students = await Student.search(query);
    res.json(students);
  } catch (err) {
    console.error("Error searching students:", err);
    res.status(500).json({
      error: "Database error",
      details: err.message,
    });
  }
};

// Get students by IDs (for exam selection)
export const getStudentsByIds = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        error: "Validation failed",
        details: ["Valid student IDs array is required"],
      });
    }

    const students = await Student.getByIds(ids);
    res.json(students);
  } catch (err) {
    console.error("Error fetching students by IDs:", err);
    res.status(500).json({
      error: "Database error",
      details: err.message,
    });
  }
};
