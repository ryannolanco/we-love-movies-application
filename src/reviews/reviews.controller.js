const reviewsService = require('./reviews.service')

const asyncErrorBoundary = require('../errors/asyncErrorBoundary')

//MIDDLEWARE VALIDATION FUNCTIONS

//check if the review exists in reviews table and if so store the review data is res.locals, otherwise send error

async function reviewExists(req, res, next) {
  const review = await reviewsService.readReview(req.params.reviewId)

  if (review) {
    res.locals.review = review
    return next()
  }
  next({ status: 404, message: `Review with id:${req.params.reviewId} cannot be found` })
}

//update review
async function update(req, res) {
  const updatedReview = {
    ...res.locals.review,
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
  const data = await reviewsService.update(updatedReview);
  res.json({ data })
}

async function destroy(req, res, next) {
  const deletedReview = await reviewsService.delete(res.locals.review.review_id)
  res.sendStatus(204)
}


module.exports = {
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)]
}