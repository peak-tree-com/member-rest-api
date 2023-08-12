const mongoose = require("mongoose");

const Schema = mongoose.Schema;


//const ItemJrnlLineItem = mongoose.model('itemjrnl_line_item', ItemJrnlLineItemsSchema);

const ItemJrnlSchema = new Schema({
    ref_no:{
        type:String,
        required : [true, 'Name is required']
    },
    ref_date:{
        type:String,
        required : [false, 'Number is required']
    },
    jnrl_type:{
	type:String, /* Purchase, Sales, PositiveJrnl, NegativeJrnl */
        required : [true, 'Journal Type is required']
    },
    item_code: {
	    type:String,
        required : [true, 'Item Code is required']
    },
    qty: {
        type: Number,
	    required : [true, 'Qty is required']
    },
    unit_price:{
        type: Number,
        required : [true, 'Unit Pricing required']
    },
    total:{
        type: Number,
        required : [true, 'Total required']
    },
    tax_prcnt:{
        type: Number,
        required : [true, 'Tax Percent required']
    },
    tax_amt:{
        type: Number,
        required : [true, 'Tax Amount required']
    },
    net_total:{
        type: Number,
        required : [true, 'Net Total required']
    }
});

ItemJrnlSchema.index({ _itemjrnltype: 1, name: 1}, { unique: true });
 

const ItemJrnl = mongoose.model('itemjrnl', ItemJrnlSchema);

exports = module.exports = ItemJrnl;

/**
 * Sample schema
"inv_no":"001",
"inv_date":"2017-10-28",
"customer":"Jegatheesan",
"address":"Injambakkam",
"city":"Chennai",
"phone":"8056034174",
"line_items":[
    {
        "line_no":"1000",
        "item_code":"5004",
        "description":"Christian Songs",
        "qty":5,
        "unit_price":145.35,
        "total":750.00,
        "tax_prcnt":5,
        "tax_amt":12.45,
        "net_total":762.50
    },
    {
        "line_no":"2000",
        "item_code":"5010",
        "description":"Bible Stories",
        "qty":3,
        "unit_price":145.35,
        "total":750.00,
        "tax_prcnt":5,
        "tax_amt":12.45,
        "net_total":762.50
    },
]

 */ 
