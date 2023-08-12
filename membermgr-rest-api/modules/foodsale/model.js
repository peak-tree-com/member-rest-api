const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FoodLineItemsSchema = new Schema({
    food_name:{
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
    price:{
        type:Number,
        required: [true]
    },
    total:{
        type:Number,
        required: [true]
    }
});

//const SalesLineItem = mongoose.model('sales_line_item', FoodLineItemsSchema);

const FoodSaleSchema = new Schema({
    inv_no:{
        type:String,
        required : [true, 'Name is required']
    },
    bookingid: {
        type: Number,
        required: [true, 'Bookingid is required']
    },
    membername: {
        type: String,
        required: [true, 'Name is required']
    },

    address: {
        type: String,
        required: [false, 'Address Line is required']
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
    line_items:[FoodLineItemsSchema]
},{
  timestamps: true
});

 

const FoodSale = mongoose.model('foodsales', FoodSaleSchema);

exports = module.exports = FoodSale;

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
