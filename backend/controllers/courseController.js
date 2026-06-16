const pool = require("../config/db");

exports.getCourses = async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM courses ORDER BY id"
  );

  res.json(result.rows);
};

exports.addCourse = async (req, res) => {
  const {
    course_name,
    course_code,
    credits,
  } = req.body;

  const result = await pool.query(
    `INSERT INTO courses
    (course_name,course_code,credits)
    VALUES($1,$2,$3)
    RETURNING *`,
    [
      course_name,
      course_code,
      credits,
    ]
  );

  res.status(201).json(result.rows[0]);
};

exports.updateCourse = async (req, res) => {
  const { id } = req.params;

  const {
    course_name,
    course_code,
    credits,
  } = req.body;

  const result = await pool.query(
    `UPDATE courses
     SET course_name=$1,
         course_code=$2,
         credits=$3
     WHERE id=$4
     RETURNING *`,
    [
      course_name,
      course_code,
      credits,
      id,
    ]
  );

  res.json(result.rows[0]);
};

exports.deleteCourse = async (req, res) => {
  await pool.query(
    "DELETE FROM courses WHERE id=$1",
    [req.params.id]
  );

  res.json({
    message: "Course Deleted",
  });
};