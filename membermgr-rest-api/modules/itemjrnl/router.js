const express = require('express');
const itemjrnlCtrl = require('./controller');

const itemjrnl_router = express.Router();
/**
 * @api {get} /api/itemjrnl Get all itemjrnl details.
 * @apiVersion 1.0.0
 * @apiGroup ItemJrnl
 * @apiName Get list of all itemjrnl
 * @apiSuccess (200) {json} Json-List-of-Object list of itemjrnl objects as JSON String
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
itemjrnl_router.get("/", itemjrnlCtrl.getAll);

/**
 * @api {get} /api/itemjrnl/:id Get itemjrnl detail by id.
 * @apiVersion 1.0.0
 * @apiGroup ItemJrnl
 * @apiName Get ItemJrnl By Id
 * @apiSuccess (200) {json} Json-Object  itemjrnl object with matching id as JSON String
 * @apiSuccessExample {json} Success-Response:
 * { "name": "John Doe",
 *   "dob": "1969-04-03",
 *   "sex": "Male",
 *   "branch" : "Vapery"
 * }
 */
// itemjrnl_router.get("/:id", itemjrnlCtrl.get);

/**
 * @api {post} /api/itemjrnl/ Create a new itemjrnl.
 * @apiVersion 1.0.0
 * @apiGroup ItemJrnl
 * @apiName Create a new itemjrnl by id
 * @apiParam (name)    {String} itemjrnl name.
 * @apiParam (dob) {Date} itemjrnl date of birth.
 * @apiParam (sex) {String} sex itemjrnl. e.g. Male || Female
 * @apiParam (branch) {String} branch of the itemjrnl.
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
// itemjrnl_router.post("/:block/create", itemjrnlCtrl.create);
itemjrnl_router.post("/", itemjrnlCtrl.create);

/**
 * @api {put} /api/itemjrnl/ Update a itemjrnl using id.
 * @apiVersion 1.0.0
 * @apiGroup ItemJrnl
 * @apiName Update a itemjrnl by id
 * @apiSuccess (200) {json} Updated-Json-Object  itemjrnl object with matching id as JSON String
 * @apiSuccessExample {json} Success-Response:
 * { "name": "John Doe",
 *   "dob": "1969-04-03",
 *   "sex": "Male",
 *   "branch" : "Vapery"
 * }
 */
itemjrnl_router.put("/:id", itemjrnlCtrl.update);

/**
 * @api {delete} /api/itemjrnl/ Delete a itemjrnl using id.
 * @apiVersion 1.0.0
 * @apiGroup ItemJrnl
 * @apiName Delete a itemjrnl by id
 * @apiSuccess (201) {json} Deleted-Json-Object  itemjrnl object with matching id as JSON String
 * @apiSuccessExample {json} Success-Response:
 * { "name": "John Doe",
 *   "dob": "1969-04-03",
 *   "sex": "Male",
 *   "branch" : "Vapery"
 * }
 */
// itemjrnl_router.delete("/:id", itemjrnlCtrl.delete);

exports = module.exports = itemjrnl_router;
