import mongoose from "mongoose";
const schema = mongoose.Schema({
    hash: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
}, { collection: 'login' });

export default schema;