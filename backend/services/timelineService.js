// backend/services/timelineService.js

const Occurrence =
    require("../models/Occurrence");

async function getDailyTimeline(
    ownerId,
    localDate
) {
    const occurrences =
        await Occurrence.find({
            ownerId,
            localDate,
        })
            .sort({
                time: 1,
            });

    const items = occurrences.map(
        (occurrence) => ({
            id: occurrence._id,

            type: "occurrence",

            occurrenceId:
                occurrence._id,

            definitionId:
                occurrence.definitionId,

            effectiveLocalDate:
                occurrence.overrideData?.localDate ||
                occurrence.localDate,

            originalLocalDate:
                occurrence.localDate,

            timezone:
                occurrence.timezone,

            time:
                occurrence.overrideData?.time ||
                occurrence.time,

            status:
                occurrence.status,

            title:
                occurrence.overrideData?.title ||
                occurrence.snapshot?.title,

            description:
                occurrence.overrideData?.description ||
                "",

            priority:
                occurrence.snapshot?.priority,

            notes:
                occurrence.notes || "",

            overrideData:
                occurrence.overrideData || null,
        })
    );

    return items;
}

module.exports = {
    getDailyTimeline,
};