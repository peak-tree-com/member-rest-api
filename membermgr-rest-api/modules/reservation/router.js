const express = require('express');
const ReservationCtrl = require('./controller');

const reservation_router = express.Router();
/**
 * @api {get} /api/room Get all room details.
 * @apiVersion 1.0.0
 * @apiGroup Room
 * @apiName Get list of all room
 * @apiSuccess (200) {json} Json-List-of-Object list of room objects as JSON String
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
reservation_router.get("/", ReservationCtrl.getAll);
reservation_router.get("/list/", ReservationCtrl.getAllReserved);
reservation_router.get("/available/", ReservationCtrl.getAllAvailable);
reservation_router.get("/month-available/", ReservationCtrl.getMonthAvailable);

/**
 * @api {get} /api/room/:id Get room detail by id.
 * @apiVersion 1.0.0
 * @apiGroup Room
 * @apiName Get Room By Id
 * @apiSuccess (200) {json} Json-Object  room object with matching id as JSON String
 * @apiSuccessExample {json} Success-Response:
 * { "name": "John Doe",
 *   "dob": "1969-04-03",
 *   "sex": "Male",
 *   "branch" : "Vapery"
 * }
 */
reservation_router.get("/:id", ReservationCtrl.getReserved);
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
reservation_router.put("/:id", ReservationCtrl.update);

/**
 * @api {delete} /api/book/ Delete a book using id.
 * @apiVersion 1.0.0
 * @apiGroup book
 * @apiName Delete a book by id
 * @apiSuccess (201) {json} Deleted-Json-Object  book object with matching id as JSON String
 * @apiSuccessExample {json} Success-Response:
 * { "name": "John Doe",
 *   "dob": "1969-04-03",
 *   "sex": "Male",
 *   "branch" : "Vapery"
 * }
 */
reservation_router.delete("/:id", ReservationCtrl.delete);

/**
 * @api {post} /api/room/ Create a new room.
 * @apiVersion 1.0.0
 * @apiGroup Room
 * @apiName Create a new room by id
 * @apiParam (name)    {String} room name.
 * @apiParam (dob) {Date} room date of birth.
 * @apiParam (sex) {String} sex room. e.g. Male || Female
 * @apiParam (branch) {String} branch of the room.
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
reservation_router.post("/", ReservationCtrl.create);



exports = module.exports = reservation_router;