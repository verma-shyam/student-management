const express = require("express");
const router = express.Router();

const {
  registerStudent,
  loginStudent,
  changeStudentPassword,
} = require("../controllers/studentAuthController");

router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.put("/change-password", changeStudentPassword);

module.exports = router;