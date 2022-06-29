module.exports.getLostItemsDTO = {
  selectedFields: {
    _id: 1,
    description: 1,
    image: 1,
    location: 1,
    dateTime: 1,
    itemTag: 1,
    type: 1,
    title: 1,
  },
  populateFields: [],
  execute: (item) => ({
    id: item._id,
    description: item.description,
    image: item.image,
    location: item.location,
    title: item.title,
    dateTime: item.dateTime,
    itemTag: item.itemTag,
  }),
};
