import mongoose from "mongoose";
const schema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    address: {
        type: String,
        required: true,
        unique: true
    },
    dob: String,
    cartItems : { type : Array , "default" : [] },
}, { collection: 'users' });

export default schema;

// object in array