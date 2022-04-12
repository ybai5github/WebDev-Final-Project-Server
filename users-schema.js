import mongoose from "mongoose";
const schema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    address: String,
    dob: String
}, { collection: 'users' });

export default schema;