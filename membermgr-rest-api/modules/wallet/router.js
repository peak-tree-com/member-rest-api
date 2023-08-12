const express = require('express');
const walletCtrl = require('./controller');

const wallet_router = express.Router();
/**
 * @api {get} /api/wallet Get all wallet details.
 * @apiVersion 1.0.0
 * @apiGroup Room
 * @apiName Get list of all wallet
 * @apiSuccess (200) {json} Json-List-of-Object list of wallet objects as JSON String
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
wallet_router.get("/", walletCtrl.getAll);

/**
 * @api {get} /api/wallet/transaction?mbr_id=<id> Get wallet detail by id.
 * @apiVersion 1.0.0
 * @apiGroup Room
 * @apiName Get Room By Id
 * @apiSuccess (200) {json} Json-Object  wallet object with matching id as JSON String
 * @apiSuccessExample {json} Success-Response:
 * { "name": "John Doe",
 *   "dob": "1969-04-03",
 *   "sex": "Male",
 *   "branch" : "Vapery"
 * }
 */
wallet_router.get("/transaction", walletCtrl.getMemberWallet);

/**
 * @api {get} /api/wallet/:id Get wallet detail by id.
 * @apiVersion 1.0.0
 * @apiGroup Room
 * @apiName Get Room By Id
 * @apiSuccess (200) {json} Json-Object  wallet object with matching id as JSON String
 * @apiSuccessExample {json} Success-Response:
 * { "name": "John Doe",
 *   "dob": "1969-04-03",
 *   "sex": "Male",
 *   "branch" : "Vapery"
 * }
 */
wallet_router.get("/:id", walletCtrl.get);



/**
 * @api {post} /api/wallet/ Create a new wallet.
 * @apiVersion 1.0.0
 * @apiGroup Room
 * @apiName Create a new wallet by id
 * @apiParam (name)    {String} wallet name.
 * @apiParam (dob) {Date} wallet date of birth.
 * @apiParam (sex) {String} sex wallet. e.g. Male || Female
 * @apiParam (branch) {String} branch of the wallet.
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
wallet_router.post("/", walletCtrl.create);

/**
 * @api {put} /api/wallet/ Update a wallet using id.
 * @apiVersion 1.0.0
 * @apiGroup Room
 * @apiName Update a wallet by id
 * @apiSuccess (200) {json} Updated-Json-Object  wallet object with matching id as JSON String
 * @apiSuccessExample {json} Success-Response:
 * { "name": "John Doe",
 *   "dob": "1969-04-03",
 *   "sex": "Male",
 *   "branch" : "Vapery"
 * }
 */
wallet_router.put("/:id", walletCtrl.update);

/**
 * @api {delete} /api/wallet/ Delete a wallet using id.
 * @apiVersion 1.0.0
 * @apiGroup Room
 * @apiName Delete a wallet by id
 * @apiSuccess (201) {json} Deleted-Json-Object  wallet object with matching id as JSON String
 * @apiSuccessExample {json} Success-Response:
 * { "name": "John Doe",
 *   "dob": "1969-04-03",
 *   "sex": "Male",
 *   "branch" : "Vapery"
 * }
 */
// wallet_router.delete("/:id", walletCtrl.delete);

exports = module.exports = wallet_router;
