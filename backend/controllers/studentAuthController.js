const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register Student Login
exports.registerStudent = async (req, res) => {
  try {
    const {
      student_id,
      email,
      password,
    } = req.body;

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO student_auth
      (student_id,email,password)
      VALUES($1,$2,$3)
      RETURNING *`,
      [
        student_id,
        email,
        hashedPassword,
      ]
    );

    res.status(201).json(
      result.rows[0]
    );
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Student Registration Failed",
    });
  }
};

// Login Student
exports.loginStudent = async (req, res) => {
  try {
    const { email, password } =
      req.body;

    const result =
      await pool.query(
        "SELECT * FROM student_auth WHERE email=$1",
        [email]
      );

    if (
      result.rows.length === 0
    ) {
      return res.status(400).json({
        message:
          "Student not found",
      });
    }

    const student =
      result.rows[0];

    const valid =
      await bcrypt.compare(
        password,
        student.password
      );

    if (!valid) {
      return res.status(400).json({
        message:
          "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      {
        id: student.student_id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      token,
      student_id:
        student.student_id,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Login Failed",
    });
  }
};
exports.changeStudentPassword = async (
  req,
  res
) => {
  try {
    const {
      email,
      oldPassword,
      newPassword,
    } = req.body;

    const result =
      await pool.query(
        `SELECT *
         FROM student_auth
         WHERE email=$1`,
        [email]
      );

    if (
      result.rows.length === 0
    ) {
      return res.status(404).json({
        message:
          "Student not found",
      });
    }

    const student =
      result.rows[0];

    const valid =
      await bcrypt.compare(
        oldPassword,
        student.password
      );

    if (!valid) {
      return res.status(400).json({
        message:
          "Old password incorrect",
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );

    await pool.query(
      `
      UPDATE student_auth
      SET password=$1
      WHERE email=$2
      `,
      [
        hashedPassword,
        email,
      ]
    );

    res.json({
      message:
        "Password Changed Successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Password Change Failed",
    });
  }
};