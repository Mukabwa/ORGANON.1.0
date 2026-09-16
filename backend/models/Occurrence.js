// backend/models/Occurrence.js

const mongoose = require("mongoose");

const OccurrenceSchema = new mongoose.Schema(
    {
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        definitionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Definition",
            required: true,
            index: true,
        },

        localDate: {
            type: String,
            required: true,
            index: true,
        },

        timezone: {
            type: String,
            required: true,
        },

        time: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            enum: [
                "pending",
                "completed",
                "skipped",
                "cancelled",
                "missed",
            ],
            default: "pending",
        },

        completedAt: {
            type: Date,
        },

        notes: {
            type: String,
            default: "",
        },

        overrideData: {
            localDate: String,
            time: String,
            title: String,
            description: String,
        },

        snapshot: {
            title: String,
            priority: {
                type: String,
                enum: ["low", "medium", "high"],
            },
        },
    },
    {
        timestamps: true,
    }
);

OccurrenceSchema.index({
    ownerId: 1,
    localDate: 1,
});

module.exports = mongoose.model(
    "Occurrence",
    OccurrenceSchema
);