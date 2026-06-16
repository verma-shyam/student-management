const pool = require("../config/db");

exports.submitReview = async (req, res) => {
  try {
    const { student_id, feedback } = req.body;

    if (!student_id || !feedback) {
      return res.status(400).json({
        message: "student_id and feedback are required",
      });
    }

    const result = await pool.query(
      `INSERT INTO admin_reviews
       (student_id, rating, review, feedback)
       VALUES($1, $2, $3, $4)
       RETURNING *`,
      [student_id, 0, "", feedback]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to submit feedback",
    });
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT r.*, s.name AS student_name
       FROM admin_reviews r
       LEFT JOIN students s ON r.student_id = s.id
       ORDER BY r.created_at DESC`
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch reviews",
    });
  }
};

exports.getReviewsByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    const result = await pool.query(
      `SELECT * FROM admin_reviews
       WHERE student_id = $1
       ORDER BY created_at DESC`,
      [studentId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch reviews",
    });
  }
};
