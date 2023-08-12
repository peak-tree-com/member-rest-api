const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FoodSchema = new Schema({
    food_name:{
        type:String,
        index: {unique: true, dropDups: true},
        required : [false, 'food is required']
    },
    description:{
        type:String,
        required : [false, 'desc is required']
    },
    cost:{
        type:Number,
        required : [false, 'cost is required']
    },
    tax_per:{
        type:Number,
        default:0,
        required : [false, 'tax_per is required']
    },
    tax_amt:{
        type:Number,
        default:0,
        required : [false, 'tax_amt is required']
    },
    selling_cost:{
        type:Number,
        required : [false, 'selling_cost is required']
    }
 
});
 

const Food = mongoose.model('food', FoodSchema);

exports = module.exports = Food;
