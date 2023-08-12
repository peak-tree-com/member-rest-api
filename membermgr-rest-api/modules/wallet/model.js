const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WalletSchema = new Schema({
    name:{
        type:String,
        required : [true, 'Member Name is required']
    },
    membership_id:{
        type:String,
        required : [true, 'Membership ID is required']
    },
    access_card_id:{
        type:String,
        required : [false, 'Membership ID is required']
    },
    transaction_date:{
        type:Date,
        required : [false, 'Date of payment is required']
    },
    description:{
        type:String,
        required:[false, 'description type is required']
    },
    balance:{
        type:Number,
        required:[false, 'balance is required']
    },
    credit:{
        type:Number,
        required:[false, 'credit is required']
    },
    debit:{
        type:Number,
        required:[false, 'debit is required']
    },
    payment_type:{
        type:String,
        required:[false, 'payment type is required']
    },
    transaction_ref:{
        type:String,
        required:[false, 'transaction is required']
    }
}); 

const Wallet = mongoose.model('wallet', WalletSchema);

exports = module.exports = Wallet;