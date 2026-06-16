const express = require("express");
const router = express.Router();

const {
  getAttendance,
  addAttendance,
  updateAttendance,
  deleteAttendance,
  getStudentAttendance,
} = require("../controllers/attendanceController");

router.get("/", getAttendance);
router.post("/", addAttendance);
router.put("/:id", updateAttendance);
router.delete("/:id", deleteAttendance);
router.get("/student/:studentId",getStudentAttendance);
module.exports = router;