import reviewsModel from './reviews-model.js';
import mongoose from "mongoose";

export const findAllReviews = async () => {
    const reviews = await reviewsModel.find();
    return reviews;
}

export const findReviewsByDrinkID = async (id) => {
    let reviews = await reviewsModel.find({drinkID: id});
    // let result = reviews.map(a=> a.drinkID)
    // console.log(reviews);
    // console.log(result);
    return reviews;
    // var id = mongoose.Types.ObjectId('625892ae07c804f0662f01b8');
    // const reviews = await reviewsModel.find({id});
    //const reviews = await reviewsModel.find();
    //console.log(reviews);
    // const a = Object.entries(reviews);
    // var result = reviews.filter(obj => {
    //     return obj.drinkID === id
    // })
    //const result = reviews.reduce((obj, cur) => ({...obj, [cur.id]: cur}), {})
    //console.log(result);
}

