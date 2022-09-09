const express = require('express');
const verify = require('../middleware/auth');
const controller = require('../controllers/foundItems.controller');

const router = express.Router();

/**
 * @openapi
 * /found:
 *    get:
 *      summary: gets list of all found items
 *      tags:
 *        - Found Items
 *      responses:
 *        '200':
 *          description:  A successful response
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 */
router.get('/', controller.getItems);
router.get('/claimIt/:id', verify, controller.claimIt);
router.delete('/delete/:id', verify, controller.deleteItem);

module.exports = router;
