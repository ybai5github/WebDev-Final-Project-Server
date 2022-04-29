import mongoose from "mongoose";
const schema = mongoose.Schema({
    name: String,
    reviews: String,
    drinkID: String,
    profilePicture: String,
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
    account: String,
    dob: String,
    account: String,
    cartItems : { type : Array , "default" : [] },
}, { collection: 'users' });

export default schema;

// object in array