const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PurchaseLineItemsSchema = new Schema({
    //purchase_line_item : { type: String, ref: 'purchase'},
    line_no : {
        type:Number,
        required:[true]
    },
    item_code:{
        type:String,
        required: [true]
    },
    description:{
        type:String,
        required: [true]
    },
    qty:{
        type:Number,
        required: [true]
    },
    unit_price:{
        type:Number,
        required: [true]
    },
    total:{
        type:Number,
        required: [true]
    },
    tax_prcnt:{
        type:Number,
        required: [true]
    },
    tax_amt:{
        type:Number,
        required: [true]
    },
    dis_prcnt:{
        type:Number,
        required: [false]
    },
    dis_amt:{
        type:Number,
        required: [false]
    },
    net_total:{
        type:Number,
        required: [true]
    }

});

//const PurchaseLineItem = mongoose.model('purchase_line_item', PurchaseLineItemsSchema);

const PurchaseSchema = new Schema({
    vendor_inv_no:{
        type:String,
        required : [true, 'Name is required']
    },
    inv_date:{
        type:Date,
        required : [false, 'Number is required']
    },
    vendor:{
        type:String,
        required : [false, 'capacity is required']
    },
    address:{
        type:String,
        required : [false, 'cost is required']
    },
    city:{
        type:String,
        required: [false, 'AC is required']
    },
    phone:{
        type:String,
        required : [false, 'Purchasetype is required']
    },
    line_items:[PurchaseLineItemsSchema]
});

// PurchaseSchema.index({ _purchasetype: 1, name: 1}, { unique: true });
const Purchase = mongoose.model('purchase', PurchaseSchema);

exports = module.exports = Purchase;
