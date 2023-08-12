const mongoose = require("mongoose");

const Schema = mongoose.Schema;
/*
{
    "memberid":"A Block",
    "room_inv_no":1
}
*/

const NextId = new Schema({
    member_id:{
        VEP: Number,
        ESP: Number,
        ROY: Number,
        KOD: Number,
        RYM: Number,
        KOT: Number,
        KIL: Number,
        BOD: Number,
    },
    sales_id:{
        type:Number,
        required : [false, 'sales_id is required']
    },
    room_inv_id:{
        type:Number,
        required : [false, 'room_inv_id is required']
    },
    room_advance_inv_id:{
        type:Number,
        required : [false, 'room_advance_inv_id is required']
    },
    food_inv_id:{
        type:Number,
        required : [false, 'food_inv_id is required']
    },
}); 

const Nextid = mongoose.model('nextid', NextId);

exports = module.exports = Nextid;