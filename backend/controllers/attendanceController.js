const pool = require("../config/db");

exports.getAttendance = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT attendance.id,
             students.name,
             attendance.date,
             attendance.status
      FROM attendance
      JOIN students
      ON students.id = attendance.student_id
      ORDER BY attendance.id DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
  }
};

exports.addAttendance = async (req, res) => {
  try {
    const {
      student_id,
      date,
      status,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO attendance
      (student_id,date,status)
      VALUES($1,$2,$3)
      RETURNING *`,
      [
        student_id,
        date,
        status,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
  }
};

exports.updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { student_id, date, status } = req.body;

    const result = await pool.query(
      `UPDATE attendance
       SET student_id=$1,
           date=$2,
           status=$3
       WHERE id=$4
       RETURNING *`,
      [student_id, date, status, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Update Failed",
    });
  }
};

exports.deleteAttendance = async (req, res) => {
  try {
    await pool.query(
      "DELETE FROM attendance WHERE id=$1",
      [req.params.id]
    );

    res.json({
      message: "Attendance Deleted",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Delete Failed",
    });
  }
};

exports.getStudentAttendance = async (req, res) => {
  try {
    const { studentId } = req.params;

    const result = await pool.query(
      `SELECT *
       FROM attendance
       WHERE student_id = $1
       ORDER BY date DESC`,
      [studentId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
  }
};