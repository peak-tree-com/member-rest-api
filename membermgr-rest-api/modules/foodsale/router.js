const express = require('express');
const foodSaleCtrl = require('./controller');

const foodsale_router = express.Router();
/**
 * @api {get} /api/sales Get all sales details.
 * @apiVersion 1.0.0
 * @apiGroup FoodSale
 * @apiName Get list of all sales
 * @apiSuccess (200) {json} Json-List-of-Object list of sales objects as JSON String
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
foodsale_router.get("/", foodSaleCtrl.getAll);

foodsale_router.get("/page/", foodSaleCtrl.getPageFoodSale);

/**
 * @api {get} /api/sales/report/page/:pgno Get sales details by page number.
 * @apiVersion 1.0.0
 * @apiGroup FoodSale
 * @apiName Get list of all sales
 * @apiSuccess (200) {json} Json-List-of-Object list of sales objects as JSON String
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
// foodsale_router.get("/report/page/:pgno", foodSaleCtrl.getPageFoodSale);

foodsale_router.get("/report", foodSaleCtrl.getFoodSaleReport);
foodsale_router.get("/report-xls", foodSaleCtrl.getFoodSaleReportXls);

/**
 * @api {get} /api/sales/:id Get sales detail by id.
 * @apiVersion 1.0.0
 * @apiGroup FoodSale
 * @apiName Get FoodSale By Id
 * @apiSuccess (200) {json} Json-Object  sales object with matching id as JSON String
 * @apiSuccessExample {json} Success-Response:
 * { "name": "John Doe",
 *   "dob": "1969-04-03",
 *   "sex": "Male",
 *   "branch" : "Vapery"
 * }
 */
foodsale_router.get("/:id", foodSaleCtrl.get);


/**
 * @api {post} /api/sales/ Create a new sales.
 * @apiVersion 1.0.0
 * @apiGroup FoodSale
 * @apiName Create a new sales by id
 * @apiParam (name)    {String} sales name.
 * @apiParam (dob) {Date} sales date of birth.
 * @apiParam (sex) {String} sex sales. e.g. Male || Female
 * @apiParam (branch) {String} branch of the sales.
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
// foodsale_router.post("/:block/create", foodSaleCtrl.create);
foodsale_router.post("/", foodSaleCtrl.create);

/**
 * @api {put} /api/sales/ Update a sales using id.
 * @apiVersion 1.0.0
 * @apiGroup FoodSale
 * @apiName Update a sales by id
 * @apiSuccess (200) {json} Updated-Json-Object  sales object with matching id as JSON String
 * @apiSuccessExample {json} Success-Response:
 * { "name": "John Doe",
 *   "dob": "1969-04-03",
 *   "sex": "Male",
 *   "branch" : "Vapery"
 * }
 */
foodsale_router.put("/:id", foodSaleCtrl.update);

/**
 * @api {delete} /api/sales/ Delete a sales using id.
 * @apiVersion 1.0.0
 * @apiGroup FoodSale
 * @apiName Delete a sales by id
 * @apiSuccess (201) {json} Deleted-Json-Object  sales object with matching id as JSON String
 * @apiSuccessExample {json} Success-Response:
 * { "name": "John Doe",
 *   "dob": "1969-04-03",
 *   "sex": "Male",
 *   "branch" : "Vapery"
 * }
 */
foodsale_router.delete("/:id", foodSaleCtrl.delete);

foodsale_router.get("/search", foodSaleCtrl.textSearch);



exports = module.exports = foodsale_router;
