const express = require('express');
const branchCtrl = require('./controller');

const branch_router = express.Router();
/**
 * @api {get} /api/branch Get all branch details.
 * @apiVersion 1.0.0
 * @apiGroup Branch
 * @apiName Get list of all branch
 * @apiSuccess (200) {json} Json-List-of-Object list of branch objects as JSON String
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
branch_router.get("/", branchCtrl.getAll);

/**
 * @api {get} /api/branch/:id Get branch detail by id.
 * @apiVersion 1.0.0
 * @apiGroup Branch
 * @apiName Get Branch By Id
 * @apiSuccess (200) {json} Json-Object  branch object with matching id as JSON String
 * @apiSuccessExample {json} Success-Response:
 * { "name": "John Doe",
 *   "code": "001"
 * }
 */
branch_router.get("/:id", branchCtrl.get);

/**
 * @api {post} /api/branch/ Create a new branch.
 * @apiVersion 1.0.0
 * @apiGroup Branch
 * @apiName Create a new branch by id
 * @apiParam (name)    {String} branch name.
 * @apiParam (dob) {Date} branch date of birth.
 * @apiParam (sex) {String} sex branch. e.g. Male || Female
 * @apiParam (branch) {String} branch of the branch.
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
branch_router.post("/", branchCtrl.create);

/**
 * @api {put} /api/branch/ Update a branch using id.
 * @apiVersion 1.0.0
 * @apiGroup Branch
 * @apiName Update a branch by id
 * @apiSuccess (200) {json} Updated-Json-Object  branch object with matching id as JSON String
 * @apiSuccessExample {json} Success-Response:
 * { "name": "John Doe",
 *   "code": "001"
 * }
 */
branch_router.put("/:id", branchCtrl.update);

/**
 * @api {delete} /api/branch/ Delete a branch using id.
 * @apiVersion 1.0.0
 * @apiGroup Branch
 * @apiName Delete a branch by id
 * @apiSuccess (201) {json} Deleted-Json-Object  branch object with matching id as JSON String
 * @apiSuccessExample {json} Success-Response:
 * { "name": "John Doe",
*   "code": "001""
 * }
 */
branch_router.delete("/:id", branchCtrl.delete);

exports = module.exports = branch_router;
