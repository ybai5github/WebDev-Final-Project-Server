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
    account: String,
    review: String,
    likes: Number,
    dislikes: Number,
    
}, { collection: 'users' });

export default schema;