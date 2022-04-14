import mongoose from "mongoose";
const schema = mongoose.Schema({
    drinksID: Number,
    review: String,
    user: String,
    profilePicture: String,
}, { collection: 'reviews' });

export default schema;