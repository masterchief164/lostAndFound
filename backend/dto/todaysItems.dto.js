module.exports.getTodaysItemsDTO = {
    selectedFields: {
        _id: 1,
        firstName: 1,
        lastName: 1,
        description: 1,
        image: 1,
        dateTime: 1,
        type: 1,
        title: 1,
    },
    populateFields: [],
    execute: (item) => ({
        id: item._id,
        description: item.description,
        image: item.image,
        title: item.title,
        dateTime: item.dateTime,
        type: item.type,
        firstName: item.firstName,
        lastName: item.lastName,
    }),
};
