const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        passwordHash: {
            type: String,
            required: true,
        },

        timezone: {
            type: String,
            default: "Africa/Nairobi",
        },

        profile: {
            avatar: {
                type: String,
                default: "",
            },

            bio: {
                type: String,
                default: "",
            },

            hobbies: [String],

            theme: {
                type: String,
                default: "default",
            },
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "User",
    UserSchema
);