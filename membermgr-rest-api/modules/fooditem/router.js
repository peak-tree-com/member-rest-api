const express = require('express');
const foodCtrl = require('./controller');

const item_router = express.Router();
/**
 * @api {get} /api/item Get all item details.
 * @apiVersion 1.0.0
 * @apiGroup Item
 * @apiName Get list of all item
 * @apiSuccess (200) {json} Json-List-of-Object list of item objects as JSON String
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
item_router.get("/", foodCtrl.getAll);

item_router.get("/page/", foodCtrl.findAll);

item_router.get("/name/", foodCtrl.getAllFoodName);

/**
 * @api {get} /api/item/:id Get item detail by id.
 * @apiVersion 1.0.0
 * @apiGroup Item
 * @apiName Get Item By Id
 * @apiSuccess (200) {json} Json-Object  item object with matching id as JSON String
 * @apiSuccessExample {json} Success-Response:
 * { "name": "John Doe",
 *   "dob": "1969-04-03",
 *   "sex": "Male",
 *   "branch" : "Vapery"
 * }
 */
item_router.get("/:id", foodCtrl.get);
// item_router.get("/barcode/:id", foodCtrl.generateBarCode);

/**
 * @api {post} /api/item/ Create a new item.
 * @apiVersion 1.0.0
 * @apiGroup Item
 * @apiName Create a new item by id
 * @apiParam (name)    {String} item name.
 * @apiParam (dob) {Date} item date of birth.
 * @apiParam (sex) {String} sex item. e.g. Male || Female
 * @apiParam (branch) {String} branch of the item.
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
item_router.post("/", foodCtrl.create);

/**
 * @api {put} /api/item/ Update a item using id.
 * @apiVersion 1.0.0
 * @apiGroup Item
 * @apiName Update a item by id
 * @apiSuccess (200) {json} Updated-Json-Object  item object with matching id as JSON String
 * @apiSuccessExample {json} Success-Response:
 * { "name": "John Doe",
 *   "dob": "1969-04-03",
 *   "sex": "Male",
 *   "branch" : "Vapery"
 * }
 */
item_router.put("/:id", foodCtrl.update);

/**
 * @api {delete} /api/item/ Delete a item using id.
 * @apiVersion 1.0.0
 * @apiGroup Item
 * @apiName Delete a item by id
 * @apiSuccess (201) {json} Deleted-Json-Object  item object with matching id as JSON String
 * @apiSuccessExample {json} Success-Response:
 * { "name": "John Doe",
 *   "dob": "1969-04-03",
 *   "sex": "Male",
 *   "branch" : "Vapery"
 * }
 */
item_router.delete("/:id", foodCtrl.delete);
item_router.get("/search", foodCtrl.textSearch);


exports = module.exports = item_router;
