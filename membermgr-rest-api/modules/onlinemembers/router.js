const express = require('express');
const onlineMemberCtrl = require('./controller');

const online_member_router = express.Router();

/**
 * @api {get} /api/member Get all member details.
 * @apiVersion 1.0.0
 * @apiGroup Member
 * @apiName Get list of all member
 * @apiSuccess (200) {json} Json-List-of-Object list of member objects as JSON String
 * @apiSuccessExample {json} Success-Response:
 * [{"_id" = "3435554af556cd", 
 *   "name": "John Doe",
 *   "dob": "1969-04-03",
 *   "sex": "Male",
 *   "branch" : "Vapery",
 *   "_v": 1.0
 * }, {"_id" = "abcdedfhiks", 
 *   "name": "Jane Doe",
 *   "dob": "1981-04-03",
 *   "sex": "Female",
 *   "branch" : "Nandanam",
 *   "_v": 1.0
 * }]
 */
// member_router.get("/", onlineMemberCtrl.getAll);

/**
 * @api {get} /api/member Get all member details.
 * @apiVersion 1.0.0
 * @apiGroup Member
 * @apiName Get list of all member
 * @apiSuccess (200) {json} Json-List-of-Object list of member objects as JSON String
 * @apiSuccessExample {json} Success-Response:
 * [{"_id" = "3435554af556cd", 
 *   "name": "John Doe",
 *   "dob": "1969-04-03",
 *   "sex": "Male",
 *   "branch" : "Vapery",
 *   "_v": 1.0
 * }, {"_id" = "abcdedfhiks", 
 *   "name": "Jane Doe",
 *   "dob": "1981-04-03",
 *   "sex": "Female",
 *   "branch" : "Nandanam",
 *   "_v": 1.0
 * }]
 */
// member_router.get("/search", onlineMemberCtrl.textSearch);

/**
 * @api {get} /api/member/:id Get member detail by id.
 * @apiVersion 1.0.0
 * @apiGroup Member
 * @apiName Get Member By Id
 * @apiSuccess (200) {json} Json-Object  member object with matching id as JSON String
 * @apiSuccessExample {json} Success-Response:
 * { "name": "John Doe",
 *   "dob": "1969-04-03",
 *   "sex": "Male",
 *   "branch" : "Vapery"
 * }
 */
// member_router.get("/:id", onlineMemberCtrl.get);

/**
 * @api {post} /api/member/ Create a new member.
 * @apiVersion 1.0.0
 * @apiGroup Member
 * @apiName Create a new member by id
 * @apiParam (name)    {String} member name.
 * @apiParam (dob) {Date} member date of birth.
 * @apiParam (sex) {String} sex member. e.g. Male || Female
 * @apiParam (branch) {String} branch of the member.
 * @apiParamExample {json} Request-Example:
 * { 
 *   "name": "John Doe", 
 *   "dob": "2003-03-19", 
 *   "sex": "Male",
 *   "branch": "Valachery" 
 * }
 * @apiSuccess (On Success returns 201-Created) {json} Created-Json-Object  Created Json Object with id
 * @apiSuccessExample {json} Success-Response:
 * { "_id" : "123565abc23de",
 *   "name": "John Doe",
 *   "dob": "1969-04-03",
 *   "sex": "Male",
 *   "branch" : "Vapery"
 * }
 */
online_member_router.post("/", onlineMemberCtrl.create);

online_member_router.post("/payment", onlineMemberCtrl.payment);

/**
 * @api {put} /api/member/ Update a member using id.
 * @apiVersion 1.0.0
 * @apiGroup Member
 * @apiName Update a member by id
 * @apiSuccess (200) {json} Updated-Json-Object  member object with matching id as JSON String
 * @apiSuccessExample {json} Success-Response:
 * { "name": "John Doe",
 *   "dob": "1969-04-03",
 *   "sex": "Male",
 *   "branch" : "Vapery"
 * }
 */
// member_router.put("/:id", onlineMemberCtrl.update);

/**
 * @api {delete} /api/member/ Delete a member using id.
 * @apiVersion 1.0.0
 * @apiGroup Member
 * @apiName Delete a member by id
 * @apiSuccess (201) {json} Deleted-Json-Object  member object with matching id as JSON String
 * @apiSuccessExample {json} Success-Response:
 * { "name": "John Doe",
 *   "dob": "1969-04-03",
 *   "sex": "Male",
 *   "branch" : "Vapery"
 * }
 */
// member_router.delete("/:id", onlineMemberCtrl.delete);

exports = module.exports = online_member_router;
