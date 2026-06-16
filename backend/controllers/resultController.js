const pool = require("../config/db");

const calculateGrade = (marks) => {
  if (marks >= 90) return "A";
  if (marks >= 75) return "B";
  if (marks >= 60) return "C";
  if (marks >= 40) return "D";
  return "F";
};

exports.getResults = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        results.id,
        results.student_id,
        results.course_id,
        students.name AS student_name,
        courses.course_name,
        results.marks,
        results.grade
      FROM results
      JOIN students
        ON students.id = results.student_id
      JOIN courses
        ON courses.id = results.course_id
      ORDER BY results.id DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
  }
};

exports.addResult = async (req, res) => {
  console.log("BODY:", req.body);

  try {
    const {
      student_id,
      course_id,
      marks,
    } = req.body;

    const grade =
      calculateGrade(Number(marks));

    const result = await pool.query(
      `INSERT INTO results
       (student_id, course_id, marks, grade)
       VALUES ($1,$2,$3,$4)
       RETURNING *`,
      [
        student_id,
        course_id,
        marks,
        grade,
      ]
    );

    res.status(201).json(
      result.rows[0]
    );
  } catch (error) {
    console.error(
      "RESULT ERROR:",
      error
    );

    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateResult = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      student_id,
      course_id,
      marks,
    } = req.body;

    const grade =
      calculateGrade(Number(marks));

    const result = await pool.query(
      `UPDATE results
       SET student_id=$1,
           course_id=$2,
           marks=$3,
           grade=$4
       WHERE id=$5
       RETURNING *`,
      [
        student_id,
        course_id,
        marks,
        grade,
        id,
      ]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Update Failed",
    });
  }
};

exports.deleteResult = async (req, res) => {
  try {
    await pool.query(
      "DELETE FROM results WHERE id=$1",
      [req.params.id]
    );

    res.json({
      message: "Result Deleted",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Delete Failed",
    });
  }
};
exports.getStudentResults = async (req, res) => {
  try {
    const { studentId } = req.params;

    const result = await pool.query(
      `
      SELECT
        results.id,
        courses.course_name,
        results.marks,
        results.grade
      FROM results
      JOIN courses
        ON courses.id = results.course_id
      WHERE results.student_id = $1
      ORDER BY results.id DESC
      `,
      [studentId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch results",
    });
  }
};

exports.getStudentStats = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Result Statistics
    const resultStats = await pool.query(
      `
      SELECT
        AVG(marks)::numeric(10,2) AS average_marks,
        MAX(marks) AS highest_marks,
        MIN(marks) AS lowest_marks,
        COUNT(*) AS total_results
      FROM results
      WHERE student_id = $1
      `,
      [studentId]
    );

    // Attendance Statistics
    const attendanceStats = await pool.query(
      `
      SELECT
        COUNT(*) FILTER (
          WHERE status = 'Present'
        ) AS present_days,

        COUNT(*) FILTER (
          WHERE status = 'Absent'
        ) AS absent_days,

        COUNT(*) AS total_days
      FROM attendance
      WHERE student_id = $1
      `,
      [studentId]
    );

    const attendance =
      attendanceStats.rows[0];

    const attendancePercentage =
      attendance.total_days > 0
        ? (
            (attendance.present_days /
              attendance.total_days) *
            100
          ).toFixed(2)
        : 0;

    res.json({
      average_marks:
        resultStats.rows[0]
          .average_marks || 0,

      highest_marks:
        resultStats.rows[0]
          .highest_marks || 0,

      lowest_marks:
        resultStats.rows[0]
          .lowest_marks || 0,

      total_results:
        resultStats.rows[0]
          .total_results || 0,

      present_days:
        attendance.present_days || 0,

      absent_days:
        attendance.absent_days || 0,

      attendance_percentage:
        attendancePercentage,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Failed to fetch student statistics",
    });
  }
};