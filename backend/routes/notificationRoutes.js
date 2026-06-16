const express = require("express");
const router = express.Router();
const {
  getNotifications,
  getNotificationsCount,
  getNotificationsForStudent,
  createNotification,
  markNotificationRead,
} = require("../controllers/notificationController");

router.get("/", getNotifications);
router.get("/count", getNotificationsCount);
router.get("/student/:studentId", getNotificationsForStudent);
router.post("/", createNotification);
router.put("/read/:id", markNotificationRead);

module.exports = router;
