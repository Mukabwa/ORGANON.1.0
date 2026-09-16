// backend/routes/definitionRoutes.js

const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    createDefinition,
} = require("../controllers/definitionController");

router.post(
    "/",
    authMiddleware,
    createDefinition
);

module.exports = router;