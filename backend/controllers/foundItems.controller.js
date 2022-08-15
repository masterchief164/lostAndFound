const { getFoundItems, checkClaimed } = require('../services/foundItems.service');
const { getFoundItemsDTO } = require('../dto/foundItems.dto');

module.exports.getItems = async (req, res) => {
  const searchFields = req.query;
  try {
    const { document, count } = await getFoundItems(searchFields, getFoundItemsDTO.selectedFields);
    const data = document.map(getFoundItemsDTO.execute);
    console.log("fetched items");
    res.send({data, count});
  } catch (err) {
    console.log(err);
  }
};

module.exports.claimIt = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const document = await checkClaimed({ id, user });
    if (document) {
      res.send({ status: 1, data: document });
    } else res.send({ status: 0, data: null });
  } catch (err) {
    console.log(err);
  }
};
