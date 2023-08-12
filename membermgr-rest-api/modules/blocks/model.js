const mongoose = require("mongoose");
const Room = require("./../rooms/model");

const Schema = mongoose.Schema;
/*
{
    "name":"A Block",
    "branch":"chennai"
}
*/


const BlockSchema = new Schema({
    name:{
        type:String,
        required : [true, 'Name is required']
    },
    branch:{
        type:String,
        required : [true, 'Branch is required']
    },
    // rooms:[]
    _rooms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'room'
    }]
}); 
// person.index({ firstName: 1, lastName: 1}, { unique: true });
BlockSchema.index({ name: 1, branch: 1}, { unique: true });


const Block = mongoose.model('Block', BlockSchema);

exports = module.exports = Block;