const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({ 
    username: String, 
    first_name: String, 
    last_name: String, 
    email: String, 
    password: String, 
    is_active: Boolean,
    is_admin: Boolean 
}); 

const User = mongoose.model('user', UserSchema);

exports = module.exports = User;
