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
    dob: String,
}, { collection: 'users' });

export default schema;