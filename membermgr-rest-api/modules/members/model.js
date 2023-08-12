const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MemberSchema = new Schema({ 
    membership_id:{
        type:String,
        index: {unique: true, dropDups: true},
        required : [true, 'Membership ID is required']
    },
    membership_type:{
        type:String,
        required : [false, 'membership type is required']
    },
    name:{
        type:String,
        required : [true, 'Name is required']
    },
    res_address:{
        type:String,
        required : [true, 'Res Address is required']
    },
    res_city:{
        type:String,
        required : [false, 'Res City is required']
    },
    res_state:{
        type:String,
        required : [false, 'Res State is required']
    },
    res_pincode:{
        type:String,
        required : [true, 'Res Pincode is required']
    },
    res_country:{
        type:String,
        required : [false, 'Res Country is required']
    },
    off_address:{
        type:String,
        required : [false, 'Office Address is required']
    },
    off_city:{
        type:String
    },
    off_state:{
        type:String
    },
    off_pincode:{
        type:String,
        required : [false, 'Office Pincode is required']
    },
    off_country:{
        type:String
    },
    tel_no_res:{
        type:String,
        required : [false, 'Telephone No.: Residence is required']
    },
    fax:{
        type:String,
        required : [false, 'Fax is required']
    },
    off_tel_no:{
        type:String,
        required : [false, 'Office Telephone No. is required']
    },
    email:{
        type:String,
        required : [false, 'E-mail is required']
    },
    dob:{
        type:Date,
        required : [false, 'Dob is required']
    },
    date_of_payment:{
        type:Date
    },
    age:{
        type:String,
        required : [false, 'Age is required']
    },
    marital_status:{
        type:String,
        required : [false, 'Marital Status is required']
    },
    religion:{
        type:String,
        required : [false, 'Religon is required']
    },
    mother_tongue:{
        type:String,
        required : [false, 'Mother Tongue is required']
    },
    intro_by:{
        type:String,
        required : [false, 'Introduced By is required']
    },
    amount_paid_rs:{
        type:String,
        required : [false, 'Amount Paid Rs is required']
    },
    amount_paid_type:{
        type:String
    },
    bank:{
        type:String,
        required : [false, 'Bank is required']
    },
    sex:{
        type:String,
        required : [false, 'Sex is required']
    },
    marital_status:{
        type:String
    },
    nationality:{
        type:String
    },
    proof_type:{
        type:String
    },
    payment_refernce:{
        type:String
    },
    id_proof:{
        type:String
    },
    branch:{
        type:String,
        required : [true, 'Branch is required']
    },
    password:{
        type:String,
        required : [false, 'password is required']
    },
    wallet_amount:{
        type:Number,
        default:0,
        required : [false, 'wallet amount required']
    },
    access_card_id:{
        type:String,
        required : [false, 'access card id required']
    },
    created_by:{
        type:String
    },
    is_active: Boolean,
    image:String,
}); 

MemberSchema.index({'$**':'text'});
const Member = mongoose.model('member', MemberSchema);

exports = module.exports = Member;