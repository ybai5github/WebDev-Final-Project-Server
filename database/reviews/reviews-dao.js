import reviewsModel from './reviews-model.js';

export const findAllReviews = async () => {
    const reviews = await reviewsModel.find();
    return reviews;
}