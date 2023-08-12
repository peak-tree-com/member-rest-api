const express = require('express');
const doorCtrl = require('./controller');

const door_router = express.Router();
/**
 * @api {get} /api/door Get all door details.
 * @apiVersion 1.0.0
 * @apiGroup Branch
 * @apiName Get list of all door
 * @apiSuccess (200) {json} Json-List-of-Object list of door objects as JSON String
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
door_router.get("/", doorCtrl.getAccess);

/**
 * @api {get} /api/door/:id Get door detail by id.
 * @apiVersion 1.0.0
 * @apiGroup Branch
 * @apiName Get Branch By Id
 * @apiSuccess (200) {json} Json-Object  door object with matching id as JSON String
 * @apiSuccessExample {json} Success-Response:
 * { "name": "John Doe",
 *   "code": "001"
 * }
 */
// door_router.get("/:id", doorCtrl.get);

/**
 * @api {post} /api/door/ Create a new door.
 * @apiVersion 1.0.0
 * @apiGroup Branch
 * @apiName Create a new door by id
 * @apiParam (name)    {String} door name.
 * @apiParam (dob) {Date} door date of birth.
 * @apiParam (sex) {String} sex door. e.g. Male || Female
 * @apiParam (door) {String} door of the door.
 * @apiParamExample {json} Request-Example:
 * { 
 *   "name": "John Doe", 
 *   "code": "001" 
 * }
 * @apiSuccess (On Success returns 201-Created) {json} Created-Json-Object  Created Json Object with id
 * @apiSuccessExample {json} Success-Response:
 * { 
 *   "_id" : "123565abc23de",
 *   "name": "John Doe",
 *   "code": "001"
 * }
 */
// door_router.post("/", doorCtrl.create);

/**
 * @api {put} /api/door/ Update a door using id.
 * @apiVersion 1.0.0
 * @apiGroup Branch
 * @apiName Update a door by id
 * @apiSuccess (200) {json} Updated-Json-Object  door object with matching id as JSON String
 * @apiSuccessExample {json} Success-Response:
 * { "name": "John Doe",
 *   "code": "001"
 * }
 */
// door_router.put("/:id", doorCtrl.update);

/**
 * @api {delete} /api/door/ Delete a door using id.
 * @apiVersion 1.0.0
 * @apiGroup Branch
 * @apiName Delete a door by id
 * @apiSuccess (201) {json} Deleted-Json-Object  door object with matching id as JSON String
 * @apiSuccessExample {json} Success-Response:
 * { "name": "John Doe",
*   "code": "001""
 * }
 */
// door_router.delete("/:id", doorCtrl.delete);

exports = module.exports = door_router;
