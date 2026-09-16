// backend/controllers/definitionController.js

const Definition =
    require("../models/Definition");

const {
    generateOccurrence,
} = require("../services/occurrenceService");

exports.createDefinition = async (
    req,
    res
) => {
    try {
        const definition =
            await Definition.create({
                ...req.body,
                ownerId: req.userId,
            });

        if (
            definition.scheduling.type ===
            "once"
        ) {
            await generateOccurrence(
                req.userId,
                definition,
                definition.scheduling.localDate
            );
        }

        res.status(201).json(
            definition
        );
    } catch (error) {
        console.error(
            "Create definition error:",
            error
        );

        res.status(500).json({
            message:
                error.message,
        });
    }
};