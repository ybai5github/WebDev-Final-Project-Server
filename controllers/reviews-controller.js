import * as reviewDao from '../database/reviews/reviews-dao.js';

const findAllReviews = async (req, res) => {
    // const drinkID = req.params.sid;
    const reviews = await reviewDao.findAllReviews();
    res.json(reviews);
}

//retrieve reviews from database with dirnksid matching
const findReviewsByDrinkID = async (req, res)=>{
    const reviews = await reviewDao.findReviewsByDrinkID(req.params.id)
    //console.log(reviews);
    res.json(reviews);
}

// const findReviewsByDrinkID = (id) => fetch(????).then(response => response.json());


const reviewsController = (app) => {
    app.get('/detail', findAllReviews);
    app.get('/detail/:id', findReviewsByDrinkID);
}

export default reviewsController;