const pool = require("../config/db");
const bcrypt = require("bcryptjs");

exports.getStudents = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM students ORDER BY id DESC"
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch students",
    });
  }
};

exports.addStudent = async (req, res) => {
  try {
    const { name, email, phone, department, password } = req.body;

    const studentResult = await pool.query(
      `INSERT INTO students
       (name,email,phone,department)
       VALUES($1,$2,$3,$4)
       RETURNING *`,
      [name, email, phone, department]
    );

    const student = studentResult.rows[0];

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO student_auth
       (student_id, email, password)
       VALUES($1, $2, $3)`,
      [student.id, email, hashedPassword]
    );

    res.status(201).json({
      student,
      credentials: {
        student_id: student.id,
        email,
        password,
      },
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Error adding student",
    });
  }
};

exports.updateStudent = async (req, res) => {
  console.log("BODY:", req.body);

  try {
    const { id } = req.params;

    const { name, email, phone, department } = req.body;

    const result = await pool.query(
      `UPDATE students
       SET name=$1,
           email=$2,
           phone=$3,
           department=$4
       WHERE id=$5
       RETURNING *`,
      [name, email, phone, department, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("UPDATE ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteStudent = async (req, res) => {
  await pool.query(
    "DELETE FROM students WHERE id=$1",
    [req.params.id]
  );

  res.json({
    message: "Student Deleted",
  });
};

exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM students WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch student",
    });
  }
};

exports.getStudentStats = async (req, res) => {
  try {
    const { studentId } = req.params;

    const attendance = await pool.query(
      `SELECT
       COUNT(*) FILTER (WHERE status='Present') as present,
       COUNT(*) as total
       FROM attendance
       WHERE student_id=$1`,
      [studentId]
    );

    const results = await pool.query(
      `SELECT
       AVG(marks) as average_marks,
       MAX(marks) as highest_marks,
       MIN(marks) as lowest_marks
       FROM results
       WHERE student_id=$1`,
      [studentId]
    );

    res.json({
      attendance:
        attendance.rows[0],
      performance:
        results.rows[0],
    });
  } catch (error) {
    console.error(error);
  }
};

exports.updateStudentProfile = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const {
      email,
      phone,
    } = req.body;

    const result = await pool.query(
      `
      UPDATE students
      SET email=$1,
          phone=$2
      WHERE id=$3
      RETURNING *
      `,
      [
        email,
        phone,
        id,
      ]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Profile Update Failed",
    });
  }
};

exports.uploadProfileImage = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      UPDATE students
      SET profile_image = $1
      WHERE id = $2
      RETURNING *
      `,
      [
        req.file.filename,
        id,
      ]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Upload Failed",
    });
  }
};