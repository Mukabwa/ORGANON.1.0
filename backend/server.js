require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const app = express();

// ==========================================================
// DATABASE
// ==========================================================

connectDB();

// ==========================================================
// MIDDLEWARE
// ==========================================================

app.use(
    cors({
        origin: "http://localhost:3000",
    })
);

app.use(express.json());

// ==========================================================
// ROUTES
// ==========================================================

app.use(
    "/api/auth",
    authRoutes
);

// ==========================================================
// HEALTH CHECK
// ==========================================================

app.get(
    "/",
    (req, res) => {
        res.json({
            message:
                "Organon 1.0 backend is running.",
        });
    }
);

// ==========================================================
// SERVER
// ==========================================================

const PORT =
    process.env.PORT || 5000;

app.listen(
    PORT,
    () => {
        console.log(
            `Organon 1.0 backend running on port ${PORT}`
        );
    }
);