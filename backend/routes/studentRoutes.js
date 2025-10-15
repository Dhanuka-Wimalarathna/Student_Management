const express = require('express');
const { addStudent, getStudents } = require('../controllers/studentController');

const router = express.Router();

router.get('/students', getStudents);
router.post('/students', addStudent);

module.exports = router;