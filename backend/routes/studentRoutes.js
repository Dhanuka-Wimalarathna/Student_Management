// const express = require("express");
// const { addStudent, getStudents } = require("../controllers/studentController");

// const router = express.Router();

// router.get("/", getStudents);
// router.post("/", addStudent);

// module.exports = router;

import express from "express";
import { addStudent, getStudents } from "../controllers/studentController.js";

const router = express.Router();

router.get("/", getStudents);
router.post("/", addStudent);

export default router;
