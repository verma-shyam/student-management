const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO admins(name,email,password)
       VALUES($1,$2,$3)
       RETURNING *`,
      [name, email, hashedPassword]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  console.log("EMAIL:", email);
  console.log("PASSWORD:", password);

  try {
    const result = await pool.query(
      "SELECT * FROM admins WHERE email=$1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({
        message: "Admin not found"
      });
    }

    const admin = result.rows[0];

    const valid = await bcrypt.compare(
      password,
      admin.password
    );
    console.log("VALID:", valid);

    if (!valid) {
      return res.status(400).json({
        message: "Invalid Credentials"
      });
    }

    const token = jwt.sign(
      { id: admin.id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.changePassword = async (req, res) => {
  const {
    email,
    oldPassword,
    newPassword,
  } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM admins WHERE email=$1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    const admin = result.rows[0];

    const valid =
      await bcrypt.compare(
        oldPassword,
        admin.password
      );

    if (!valid) {
      return res.status(400).json({
        message:
          "Old password is incorrect",
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );

    await pool.query(
      `UPDATE admins
       SET password=$1
       WHERE email=$2`,
      [hashedPassword, email]
    );

    res.json({
      message:
        "Password changed successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Password change failed",
    });
  }
};
