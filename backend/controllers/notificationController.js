const pool = require("../config/db");

exports.getNotifications = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT n.*, s.name AS student_name
       FROM admin_notifications n
       LEFT JOIN students s ON n.student_id = s.id
       ORDER BY n.created_at DESC`
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch notifications",
    });
  }
};

exports.getNotificationsCount = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT COUNT(*) AS count FROM admin_notifications"
    );

    res.json({ count: Number(result.rows[0].count) });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch notification count",
    });
  }
};

exports.getNotificationsForStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    const result = await pool.query(
      `SELECT n.*
       FROM admin_notifications n
       WHERE n.student_id IS NULL OR n.student_id = $1
       ORDER BY n.created_at DESC`,
      [studentId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch student notifications",
    });
  }
};

exports.createNotification = async (req, res) => {
  try {
    const { message, student_id } = req.body;

    if (!message) {
      return res.status(400).json({
        message: "Notification message is required",
      });
    }

    const result = await pool.query(
      `INSERT INTO admin_notifications
       (message, student_id, is_read)
       VALUES($1,$2,false)
       RETURNING *`,
      [message, student_id || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create notification",
    });
  }
};

exports.markNotificationRead = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      `UPDATE admin_notifications
       SET is_read = true
       WHERE id = $1`,
      [id]
    );

    res.json({ message: "Notification marked read" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update notification",
    });
  }
};
