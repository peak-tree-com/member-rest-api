const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BranchSchema = new Schema({
    code:{
        type:String,
        required : [true, 'Code is required']
    },
    name:{
        type:String,
        required : [true, 'Name is required']
    }
}); 

const Branch = mongoose.model('branch', BranchSchema);

exports = module.exports = Branch;