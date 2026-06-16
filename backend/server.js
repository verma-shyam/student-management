const pool = require("./config/db");
const express = require("express");
const cors = require("cors");
const studentAuthRoutes =
require("./routes/studentAuthRoutes");
require("dotenv").config();

require("./config/db"); // Connect PostgreSQL

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth",
  require("./routes/authRoutes")
);

app.use("/api/students",
  require("./routes/studentRoutes")
);

app.use("/api/dashboard",
  require("./routes/dashboardRoutes")
);

app.use("/api/courses",
  require("./routes/courseRoutes")
);

app.get("/", (req, res) => {
  res.send("Student Management API Running");
});

app.use("/api/attendance",
  require("./routes/attendanceRoutes")
);

app.use("/api/results",
  require("./routes/resultRoutes")
);
app.use("/api/student-auth",
  studentAuthRoutes
);
app.use("/uploads",
  express.static("uploads")
);

app.get("/api/admins", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email FROM admins"
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error fetching admins",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});