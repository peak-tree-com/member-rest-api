const mongoose = require("mongoose");
const ItemType = require("./../itemtype/model")

const Schema = mongoose.Schema;

const ItemSchema = new Schema({

    category: { 
        type: String,
        required : [false, 'category is required']
    },
    sub_category: { 
        type: String,
        required : [false, 'sub_category is required']
    },
    vendor_code:{
        type:String,
        required : [false, 'vendor_code is required']
    },
    item_code:{
        type:String,
        index: {unique: true, dropDups: true},
        required : [false, 'item_code is required']
    },
    bar_code:{
        type:String,
        // index: {unique: true, dropDups: true},
        required : [false, 'bar_code is required']
    },
    description:{
        type:String,
        required : [false, 'desc is required']
    },
    author:{
        type:String,
        required : [false, 'author is required']
    },
    publisher:{
        type:String,
        required : [false, 'publisher is required']
    },
    yop:{
        type:Date,
        required: [false, 'year of publish is required']
    },
    edition:{
        type:String,
        required : [false, 'edition is required']
    },
    cost:{
        type:Number,
        required : [false, 'cost is required']
    },
    tax_per:{
        type:Number,
        required : [false, 'tax_per is required']
    },
    tax_amt:{
        type:Number,
        required : [false, 'tax_amt is required']
    },
    selling_cost:{
        type:Number,
        required : [false, 'selling_cost is required']
    }
 
});

ItemSchema.index({ _itemtype: 1, name: 1});
 

const Item = mongoose.model('item', ItemSchema);

exports = module.exports = Item;
