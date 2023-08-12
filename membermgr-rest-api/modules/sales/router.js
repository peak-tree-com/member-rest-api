const express = require('express');
const salesCtrl = require('./controller');

const sales_router = express.Router();
/**
 * @api {get} /api/sales Get all sales details.
 * @apiVersion 1.0.0
 * @apiGroup Sales
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
sales_router.get("/", salesCtrl.getAll);

sales_router.get("/page/", salesCtrl.getPageSales);

/**
 * @api {get} /api/sales/report/page/:pgno Get sales details by page number.
 * @apiVersion 1.0.0
 * @apiGroup Sales
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
// sales_router.get("/report/page/:pgno", salesCtrl.getPageSales);

sales_router.get("/report", salesCtrl.getSalesReport);
sales_router.get("/report-xls", salesCtrl.getSalesReportXls);

/**
 * @api {get} /api/sales/:id Get sales detail by id.
 * @apiVersion 1.0.0
 * @apiGroup Sales
 * @apiName Get Sales By Id
 * @apiSuccess (200) {json} Json-Object  sales object with matching id as JSON String
 * @apiSuccessExample {json} Success-Response:
 * { "name": "John Doe",
 *   "dob": "1969-04-03",
 *   "sex": "Male",
 *   "branch" : "Vapery"
 * }
 */
sales_router.get("/:id", salesCtrl.get);


/**
 * @api {post} /api/sales/ Create a new sales.
 * @apiVersion 1.0.0
 * @apiGroup Sales
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
// sales_router.post("/:block/create", salesCtrl.create);
sales_router.post("/", salesCtrl.create);

/**
 * @api {put} /api/sales/ Update a sales using id.
 * @apiVersion 1.0.0
 * @apiGroup Sales
 * @apiName Update a sales by id
 * @apiSuccess (200) {json} Updated-Json-Object  sales object with matching id as JSON String
 * @apiSuccessExample {json} Success-Response:
 * { "name": "John Doe",
 *   "dob": "1969-04-03",
 *   "sex": "Male",
 *   "branch" : "Vapery"
 * }
 */
sales_router.put("/:id", salesCtrl.update);

/**
 * @api {delete} /api/sales/ Delete a sales using id.
 * @apiVersion 1.0.0
 * @apiGroup Sales
 * @apiName Delete a sales by id
 * @apiSuccess (201) {json} Deleted-Json-Object  sales object with matching id as JSON String
 * @apiSuccessExample {json} Success-Response:
 * { "name": "John Doe",
 *   "dob": "1969-04-03",
 *   "sex": "Male",
 *   "branch" : "Vapery"
 * }
 */
sales_router.delete("/:id", salesCtrl.delete);

sales_router.get("/search", salesCtrl.textSearch);



exports = module.exports = sales_router;
