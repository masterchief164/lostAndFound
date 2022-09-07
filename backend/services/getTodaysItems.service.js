const {foundModel, lostModel} = require("../models/report.model");

module.exports.getTodaysItems = async (selectedFields) => {
    try {
        const date = new Date().toISOString().split('T')[0];
        let found = await foundModel.find({'dateTime':{$regex:date}})
            .select(selectedFields.selectedFields)
            .sort({dateTime: -1})
            .lean()
            .exec();

        let lost = await lostModel.find({'dateTime':{$regex:date}})
            .select(selectedFields.selectedFields)
            .sort({dateTime: -1})
            .lean()
            .exec();

        return [...found, ...lost];
    } catch (err) {
        console.log(err);
    }
}
