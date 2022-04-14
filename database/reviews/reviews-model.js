import mongoose from "mongoose";
import reviewSchema from './reviews-schema.js'

const reviewsModel = mongoose.model('ReviewModel', reviewSchema);

export default reviewsModel;