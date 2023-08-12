const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MembershipSchema = new Schema({
    name:{
        type:String,
        required : [true, 'Name is required']
    },
    type:{
        type:String,
        required : [true, 'Type is required']
    },

    validity:{
        type:String,
        required : [true, 'Validity is required']
    },

    cast:{
        type:String,
        required : [true, 'Cast is required']
    }
   
}); 

const Membership = mongoose.model('membership', MembershipSchema);

exports = module.exports = Membership;