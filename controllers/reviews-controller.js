import * as reviewDao from '../database/reviews/reviews-dao.js';




const findAllReviews = async (req, res) => {
    //const tid = req.params.sid;
    const reviews = await reviewDao.findAllReviews();
    res.json(reviews);
}

const reviewsController = (app) => {
    app.get(`/detail`, findAllReviews);
}

export default reviewsController;