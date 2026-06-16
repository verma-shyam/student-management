const express = require("express");
const router = express.Router();
const upload =require("../middleware/upload");
const {
  getStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent,
  changeStudentPassword,
  updateStudentProfile,
  uploadProfileImage
} = require("../controllers/studentController");

router.get("/", getStudents);
router.post("/", addStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);
router.get("/:id",getStudentById);
router.put("/change-password",changeStudentPassword);
router.put("/profile/:id",updateStudentProfile);
router.put("/upload/:id",upload.single("image"),uploadProfileImage);

module.exports = router;