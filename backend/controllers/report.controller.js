const {saveItem} = require('../services/report.service');
const logger = require('../bin/winston.util');

module.exports.createItem = async (req, res) => {
    try {
        let body = req.body;
        const document = await saveItem(body);
        res.send(document);
    } catch (err) {
        logger.error({
            err: err.stack,
            file: 'report.controller.js',
            params: {},
          });  
    }
}
