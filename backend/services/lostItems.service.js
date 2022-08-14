const { lostModel } = require('../models/report.model');

module.exports.getAllLostItems = async (searchFields, selectedFields) => {
  try {
    let regexp = null;
    if (searchFields.searchText !== '') regexp = new RegExp(`^${searchFields.searchText}`, 'i');

    const searchArray = [];
    let checkTags = false;

    if (searchFields.title === 'false' && searchFields.description === 'false'
      && searchFields.location === 'false' && searchFields.username === 'false') {
      checkTags = true;
    }

    if (searchFields.title === 'true' || checkTags) searchArray.push({ title: regexp });
    if (searchFields.description === 'true' || checkTags) searchArray.push({ description: regexp });
    if (searchFields.location === 'true' || checkTags) searchArray.push({ location: regexp });
    if (searchFields.username === 'true' || checkTags) searchArray.push({ firstName: regexp });

    let count = 0;
    if(searchFields.count)
      count = searchFields.count;

    return await lostModel.find(
      regexp ? {
        $or: searchArray,
      } : {},
    )
      .select(selectedFields)
      .limit(count)
      .sort({dateTime:-1})
      .lean()
      .exec();
  } catch (err) {
    console.log(err);
  }
};

module.exports.checkClaimed = async (searchFields) => {
  try {
    const document = await lostModel.findOne({ _id: searchFields.id }).lean().exec();
    if (document && document.claimedBy) {
      return document;
    }
    const newEntry = await lostModel.findOneAndUpdate(
      { _id: searchFields.id },
      { claimedBy: searchFields.user.email },
    ).lean().exec();
    return newEntry;
  } catch (error) {
    console.log(error);
  }
};
