const mongoose = require("mongoose");
const Schema = mongoose.Schema;


var RoomBookingSchema = new Schema({
    name : String,
    branch : String,
    room_no : String,
    roomtype: String,
    capacity: Number,
    cost: Number,
    extrabed: Boolean,
    cost: Number
});

const BookingSchema = new Schema({

    advance_bill_No: {
        type: Number,
        required: [true, 'Bookingid is required']
    },
    bookingid: {
        type: Number,
        required: [true, 'Bookingid is required']
    },
    memberid: {
        type: String,
        required: [true, 'Memberid is required']
    },
    membername: {
        type: String,
        required: [true, 'Name is required']
    },

    address: {
        type: String,
        required: [false, 'Address Line is required']
    },
    city: {
        type: String,
        required: [false, 'City is required']
    },
    pincode: {
        type: String,
        required: [false, 'Pincode is required']
    },

    phone_no: {
        type: String,
        required: [false, 'phone_no is required']
    },

    email_id: {
        type: String,
        required: [false, 'email_id is required']
    },

    nationality: {
        type: String,
        required: [false, 'nationality is required']
    },

    proof_type: {
        type: String,
        required: [false, 'proof_type is required']
    },

    purpose_of_stay: {
        type: String,
        required: [false, 'purpose_of_stay is required']
    },

    proof_number: {
        type: String,
        required: [false, 'proof_number is required']
    },

    id_proof_attachment: String,

    startdate: {
        type: Date,
        required: [true, 'Start Date is required']
    },

    enddate: {
        type: Date,
        required: [true, 'End Date is required']
    },

    booked_rooms : [RoomBookingSchema],
    history_of_rooms : [RoomBookingSchema],
    rooms:String,
    dis_percent: Number, //25%
    dis_amount: Number, // (2500+500) - (2500+500)*0.25
    total_gst: Number, //18%
    tax_percent:Number,
    tax_amount:Number,
    balance: Number,
	advance: Number,
    total_booking_amount: Number,
	booking_amount: Number,
	checkout_date_time : Date,
	checkout_by : String,
	amount_paid : Number,
	payment_type : String, //cheque | DD | Cash | Bank Transfer | CC
	payment_details :{
        transaction_ref:String,
        bank:String,
        date:Date
    },
    status: {
        type: String,
        default: 'IN'
    },
    created_by : {
        type: String,
        default: 'admin'
    }
},{
  timestamps: true
});

const Booking = mongoose.model('bookings', BookingSchema);

exports = module.exports = Booking;