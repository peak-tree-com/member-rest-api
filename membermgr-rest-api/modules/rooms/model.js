const mongoose = require("mongoose");
const Block = require("./../blocks/model")

const Schema = mongoose.Schema;
/*
{
    "_block":"594e5add372aaf7eb7258b7b"
    "name":"aa",
    "room_no":"1001",
    "capacity":2,
    "ac":true,
    "roomtype":"mini suite",
    "branch":"chennai",
}
*/

const RoomSchema = new Schema({

    _block: { type: String, ref: 'Block'},
    name:{
        type:String,
        required : [true, 'Name is required']
    },
    room_no:{
        type:String,
        required : [false, 'Number is required']
    },
    capacity:{
        type:Number,
        required : [false, 'capacity is required']
    },
    cost:{
        type:Number,
        required : [false, 'cost is required']
    },
    ac:{
        type:Boolean,
        required: [false, 'AC is required']
    },
    roomtype:{
        type:String,
        required : [false, 'Roomtype is required']
    },
    branch:{
        type:String,
        required : [true, 'Branch is required']
    } 
});

RoomSchema.index({ _block: 1, room_no: 1}, { unique: true });
 

const Room = mongoose.model('room', RoomSchema);

exports = module.exports = Room;