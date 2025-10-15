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

    if (enrollmentDate > today) {
      errors.push("Enrollment date cannot be in the future");
    }
  }

  return errors;
};

export const addStudent = (req, res) => {
  // Backend validation
  const validationErrors = validateStudentData(req.body);

  if (validationErrors.length > 0) {
    return res.status(400).json({
      error: "Validation failed",
      details: validationErrors,
    });
  }

  // Check for duplicate NIC
  Student.findByNIC(req.body.nic, (err, nicResults) => {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err });
    }

    if (nicResults.length > 0) {
      return res.status(400).json({
        error: "Validation failed",
        details: ["NIC already exists"],
      });
    }

    // If all validations pass, create student
    Student.create(req.body, (err, result) => {
      if (err) {
        // Handle database-specific errors (like unique constraints)
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({
            error: "Validation failed",
            details: ["Student with same NIC or phone already exists"],
          });
        }
        return res.status(500).json({ error: "Database error", details: err });
      }

      res.status(201).json({
        message: "Student added successfully",
        studentId: result.insertId,
        student: {
          id: result.insertId,
          ...req.body,
          status: "Enrolled",
        },
      });
    });
  });
};

export const getStudents = (req, res) => {
  Student.getAll((err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err });
    }
    res.json(results);
  });
};
