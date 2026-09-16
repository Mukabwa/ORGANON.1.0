const {
    getDailyTimeline,
} = require("../services/timelineService");

exports.getDailyTimeline = async (
    req,
    res
) => {
    try {
        const { date } = req.query;

        if (!date) {
            return res.status(400).json({
                message:
                    "A date is required.",
            });
        }

        const items =
            await getDailyTimeline(
                req.userId,
                date
            );

        res.status(200).json({
            date,
            items,
        });
    } catch (error) {
        console.error(
            "Get daily timeline error:",
            error
        );

        res.status(500).json({
            message:
                error.message,
        });
    }
};