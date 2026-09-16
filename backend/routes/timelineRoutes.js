const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    getDailyTimeline,
} = require("../controllers/timelineController");

router.get(
    "/daily",
    authMiddleware,
    getDailyTimeline
);

module.exports = router;