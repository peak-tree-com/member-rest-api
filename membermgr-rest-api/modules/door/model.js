const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DoorSchema = new Schema({
    code:{
        type:String,
        required : [true, 'Code is required']
    },
    name:{
        type:String,
        required : [true, 'Name is required']
    }
}); 

const Door = mongoose.model('door', DoorSchema);

exports = module.exports = Door;