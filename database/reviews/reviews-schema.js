import mongoose from "mongoose";
const schema = mongoose.Schema({
    drinkID: {type: String, required: true},
    review: {type: String, required: true},
    user: {type: String, default: 'Unknown'},
    profilePicture: {type: String, default: '/image/profile.png'},
}, { collection: 'reviews' });

export default schema;