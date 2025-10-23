const express = require("express");
const { addStudent, getStudents } = require("../controllers/studentController");

const router = express.Router();

router.get("/", getStudents);
router.post("/", addStudent);

module.exports = router;
