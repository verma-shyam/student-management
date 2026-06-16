const pool = require("../config/db");

exports.getDashboardStats = async (req, res) => {
  try {
    const students = await pool.query(
      "SELECT COUNT(*) FROM students"
    );

    const courses = await pool.query(
      "SELECT COUNT(*) FROM courses"
    );

    const results = await pool.query(
      "SELECT COUNT(*) FROM results"
    );

    const totalAttendance = await pool.query(
        "SELECT COUNT(*) FROM attendance"
        );

        const presentAttendance = await pool.query(
        "SELECT COUNT(*) FROM attendance WHERE status='Present'"
        );

        const attendancePercentage =
        Number(totalAttendance.rows[0].count) > 0
            ? Math.round(
                (Number(
                presentAttendance.rows[0].count
                ) /
                Number(
                    totalAttendance.rows[0].count
                )) *
                100
    )
    : 0;

    res.json({
      students: students.rows[0].count,
      courses: courses.rows[0].count,
      results: results.rows[0].count,
      attendance: attendancePercentage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};