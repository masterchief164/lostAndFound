module.exports.getFoundItemsDTO = {
  selectedFields: {
    _id: 1,
    firstName: 1,
    lastName:1,
    email: 1,
    phone:1,
    description:1,
    image:1,
    location:1,
  },
  populateFields: [],
  execute: (item) => {
    return {
      id: item._id,
      firstName: item.firstName,
      lastName:item.lastName,
      email: item.email,
      phone:item.phone,
      description:item.description,
      image:item.image,
      location:item.location,
     };
  },
};
