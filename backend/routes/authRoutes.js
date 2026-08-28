const express = require("express");

const {
    register,
    login,
    me,
} = require("../controllers/authController");

const authMiddleware = require(
    "../middleware/authMiddleware"
);

const router = express.Router();

// Register
router.post(
    "/register",
    register
);

// Login
router.post(
    "/login",
    login
);

// Current authenticated user
router.get(
    "/me",
    authMiddleware,
    me
);

module.exports = router;