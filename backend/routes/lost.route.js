const express = require('express');
const verify = require('../middleware/auth');
const controller = require('../controllers/lostItems.controller');

const router = express.Router();

/**
 * @openapi
 * /lost:
 *    get:
 *      summary: gets list of all lost items
 *      tags:
 *        - Lost Items
 *      responses:
 *        '200':
 *          description:  A successful response
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 */
router.get('/', controller.getItems);
router.get('/foundIt/:id', verify, controller.foundIt);

module.exports = router;
