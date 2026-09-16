// backend/services/occurrenceService.js

const Occurrence = require("../models/Occurrence");

async function generateOccurrence(
    ownerId,
    definition,
    localDate
) {
    const occurrence =
        await Occurrence.create({
            ownerId,

            definitionId:
                definition._id,

            localDate,

            timezone:
                definition.scheduling.timezone,

            time:
                definition.scheduling.time,

            status: "pending",

            snapshot: {
                title:
                    definition.title,

                priority:
                    definition.metadata.priority,
            },
        });

    return occurrence;
}

module.exports = {
    generateOccurrence,
};