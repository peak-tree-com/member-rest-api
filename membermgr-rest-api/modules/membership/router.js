const express = require('express');
const membershipCtrl = require('./controller');

const membership_router = express.Router();
/**
 * @api {get} /api/membership Get all membership details.
 * @apiVersion 1.0.0
 * @apiGroup Membership
 * @apiName Get list of all membership
 * @apiSuccess (200) {json} Json-List-of-Object list of membership objects as JSON String
 * @apiSuccessExample {json} Success-Response:
 * [{"_id" = "3435554af556cd", 
 *   "name": "John Doe",
 *   "code": "001",
 *   "_v": 1.0
 * }, {"_id" = "abcdedfhiks", 
 *   "name": "Jane Doe",
 *    "code": "001",
 *   "_v": 1.0
 * }]
 */
membership_router.get("/", membershipCtrl.getAll);

/**
 * @api {get} /api/membership/:id Get membership detail by id.
 * @apiVersion 1.0.0
 * @apiGroup Membership
 * @apiName Get Membership By Id
 * @apiSuccess (200) {json} Json-Object  membership object with matching id as JSON String
 * @apiSuccessExample {json} Success-Response:
 * { "name": "John Doe",
 *   "code": "001"
 * }
 */
membership_router.get("/:id", membershipCtrl.get);

/**
 * @api {post} /api/membership/ Create a new membership.
 * @apiVersion 1.0.0
 * @apiGroup Membership
 * @apiName Create a new membership by id
 * @apiParam (name)    {String} membership name.
 * @apiParam (dob) {Date} membership date of birth.
 * @apiParam (sex) {String} sex membership. e.g. Male || Female
 * @apiParam (membership) {String} membership of the membership.
 * @apiParamExample {json} Request-Example:
 * { 
 *   "name": "John Doe", 
 *   "type": "Car",
 *   "validity":"12 days",
 *   "cast": "Hindu" 
 * }
 * @apiSuccess (On Success returns 201-Created) {json} Created-Json-Object  Created Json Object with id
 * @apiSuccessExample {json} Success-Response:
 * { 
 *   "name": "John Doe", 
 *   "type": "Car",
 *   "validity":"12 days",
 *   "cast": "Hindu" 
 * }
 */
membership_router.post("/", membershipCtrl.create);

/**
 * @api {put} /api/membership/ Update a membership using id.
 * @apiVersion 1.0.0
 * @apiGroup Membership
 * @apiName Update a membership by id
 * @apiSuccess (200) {json} Updated-Json-Object  membership object with matching id as JSON String
 * @apiSuccessExample {json} Success-Response:
 *{ 
 *   "name": "John Doe", 
 *   "type": "Car",
 *   "validity":"12 days",
 *   "cast": "Hindu" 
 * }
 */
membership_router.put("/:id", membershipCtrl.update);

/**
 * @api {delete} /api/membership/ Delete a membership using id.
 * @apiVersion 1.0.0
 * @apiGroup Membership
 * @apiName Delete a membership by id
 * @apiSuccess (201) {json} Deleted-Json-Object  membership object with matching id as JSON String
 * @apiSuccessExample {json} Success-Response:
 *{
 *   "name": "John Doe", 
 *   "type": "Car",
 *   "validity":"12 days",
 *   "cast": "Hindu" 
 * }
 */
membership_router.delete("/:id", membershipCtrl.delete);

exports = module.exports = membership_router;
