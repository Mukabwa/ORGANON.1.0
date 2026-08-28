const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const generateToken = (userId) => {
    return jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );
};

// ==========================================================
// REGISTER
// ==========================================================

exports.register = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            timezone,
        } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message:
                    "Name, email and password are required.",
            });
        }

        const existingUser =
            await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message:
                    "An account with this email already exists.",
            });
        }

        const passwordHash =
            await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            passwordHash,
            timezone,
        });

        const token = generateToken(user._id);

        return res.status(201).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                timezone: user.timezone,
            },
        });
    } catch (error) {
        console.error(
            "Register error:",
            error
        );

        return res.status(500).json({
            message:
                "Failed to create account.",
        });
    }
};

// ==========================================================
// LOGIN
// ==========================================================

exports.login = async (req, res) => {
    try {
        const {
            email,
            password,
        } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message:
                    "Email and password are required.",
            });
        }

        const user =
            await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message:
                    "Invalid email or password.",
            });
        }

        const passwordMatches =
            await bcrypt.compare(
                password,
                user.passwordHash
            );

        if (!passwordMatches) {
            return res.status(401).json({
                message:
                    "Invalid email or password.",
            });
        }

        const token = generateToken(user._id);

        return res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                timezone: user.timezone,
            },
        });
    } catch (error) {
        console.error(
            "Login error:",
            error
        );

        return res.status(500).json({
            message:
                "Failed to log in.",
        });
    }
};

// ==========================================================
// CURRENT USER
// ==========================================================

exports.me = async (req, res) => {
    try {
        const user =
            await User.findById(
                req.userId
            ).select("-passwordHash");

        if (!user) {
            return res.status(404).json({
                message: "User not found.",
            });
        }

        return res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            timezone: user.timezone,
        });
    } catch (error) {
        console.error(
            "Get current user error:",
            error
        );

        return res.status(500).json({
            message:
                "Failed to retrieve user.",
        });
    }
};