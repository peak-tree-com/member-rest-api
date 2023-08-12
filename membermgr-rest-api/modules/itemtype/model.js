const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemTypeSchema = new Schema({
    title:{
        type:String,
        required : [true, 'Name is required']
    }
}); 

const ItemType = mongoose.model('ItemType', ItemTypeSchema);

exports = module.exports = ItemType;
