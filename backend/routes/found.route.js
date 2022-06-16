const express = require('express');
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

module.exports = router;
