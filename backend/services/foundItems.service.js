const { foundModel } = require('../models/report.model');

module.exports.getFoundItems = async (searchFields, selectedFields) => {
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

    let count  = 0;
    if(searchFields.count)
      count = searchFields.count;

    let cnt = foundModel.countDocuments({}).exec();
    let document = foundModel.find(
      regexp ? {
        $or: searchArray,
      } : {},
    )
      .select(selectedFields)
      .limit(count)
      .sort({ dateTime: -1 })
      .lean()
      .exec();

    [cnt,document] = await Promise.all([cnt, document])

    return { document, count: cnt };
  } catch (err) {
    console.log(err);
  }
};

module.exports.checkClaimed = async (searchFields) => {
  try {
    const document = await foundModel.findOne({ _id: searchFields.id }).lean().exec();
    if (document && document.claimedBy) {
      return document;
    }
    return await foundModel.findOneAndUpdate(
        {_id: searchFields.id},
        {claimedBy: searchFields.user.email},
    ).lean().exec();

  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteFoundItem = async ({id,user}) => {
  try{
    const document = await foundModel.findOne({_id:id}).lean().exec();
    if(document && document.submittedBy === user.email){
      await foundModel.deleteOne({_id:id}).lean().exec();
      return 200;
    }else if(document && document.submittedBy !== user.email){
      return 401;
    } else {
      return 404;
    }
  } catch (error) {
    console.log(error);
    return 500;
  }
}
