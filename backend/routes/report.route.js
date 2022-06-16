const express = require('express');
const controller = require('../controllers/report.controller');

const router = express.Router();

/**
 * @swagger
 * paths:
 *   /report/form:
 *      post:
 *        summary: Reports new lost or found item
 *        tags:
 *          - Report
 *        parameters:
 *          - in: body
 *            name: Report
 *            description: User object
 *            schema:
 *              type: object
 *              properties:
 *                  firstName:
 *                      type: string
 *                  lastName:
 *                      type: string
 *                  email:
 *                      type: string
 *                  phone:
 *                      type: string
 *                  description:
 *                      type: string
 *                  image:
 *                      type: string
 *                  location:
 *                      type: string
 *                  type:
 *                      type: string
 *        responses:
 *          '200':
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 */
router.post('/', controller.createItem);

module.exports = router;
