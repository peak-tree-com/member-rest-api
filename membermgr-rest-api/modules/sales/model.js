const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SalesLineItemsSchema = new Schema({
    line_no : {
        type:Number,
        required:[false]
    },
    item_code:{
        type:String,
        required: [true]
    },
    description:{
        type:String,
        required: [false]
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

//const SalesLineItem = mongoose.model('sales_line_item', SalesLineItemsSchema);

const SalesSchema = new Schema({
    inv_no:{
        type:String,
        required : [true, 'Name is required']
    },
    payment_type:{
        type:String,
        required : [false, 'Payment type is required']
    },
    payment_ref:{
        type:String,
        required : [false, 'Payment reference is required']
    },
    inv_date:{
        type:Date,
        required : [false, 'Number is required']
    },
    customer:{
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
        required : [false, 'Salestype is required']
    },
    total_item:{
        type:Number,
        required: [false]
    },
    total_amount:{
        type:Number,
        required: [false]
    },
    total_tax:{
        type:Number,
        required: [false]
    },
    total_discount:{
        type:Number,
        required: [false]
    },
    bill_amount:{
        type:Number,
        required: [false]
    },
    line_items:[SalesLineItemsSchema]
});

 

const Sales = mongoose.model('sales', SalesSchema);

exports = module.exports = Sales;

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
