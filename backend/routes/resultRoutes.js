const express = require("express");
const router = express.Router();

const {
  getResults,
  addResult,
  updateResult,
  deleteResult,
  getStudentResults,
  getStudentStats,
} = require(
  "../controllers/resultController"
);

router.get("/", getResults);
router.get("/student/:studentId",getStudentResults);
router.post("/", addResult);
router.put("/:id", updateResult);
router.delete("/:id", deleteResult);
router.get("/stats/:studentId",getStudentStats);


module.exports = router;