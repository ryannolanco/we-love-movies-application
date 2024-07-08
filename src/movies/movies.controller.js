const moviesService = require('./movies.service')

const asyncErrorBoundary = require('../errors/asyncErrorBoundary')



//MIDDLEWARE VALIDATION FUNCTIONS

//check if the movie exists in movies table and if so store the movie data is res.locals, otherwise send error
async function movieExists(req, res, next) {
  const movie = await moviesService.read(req.params.movieId)

  if (movie) {
    res.locals.movieId = req.params.movieId
    res.locals.movie = movie;
    return next()
  }
  
  next({ status: 404, message: `Movie with id:${req.params.movieId} can not be found` })
}

//return a list or reviews for a specific movie
async function readReviewsForMovie(req, res) {
  const data = await moviesService.readReviewsForMovie(res.locals.movieId)
  res.json({ data })
}


//return a list of movie theaters where a specific movie is playing
async function readTheatersForMovie(req, res) {
  const data = await moviesService.readTheatersForMovie(res.locals.movieId)
  res.json({ data })
}


//return a specific movie which has already been stored in locals from movieExists function
function read(req, res) {
  const data = res.locals.movie
  res.json({ data })
}

// return all movies currently in the movies table
async function list(req, res) {
  const isShowing = req.query.is_showing

  let data;
  if (isShowing) {
    data = await moviesService.listIsShowing();
  }
  else {
    data = await moviesService.list()
  }
  
  res.json({ data })
}


module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), read],
  readTheatersForMovie: [asyncErrorBoundary(movieExists), asyncErrorBoundary(readTheatersForMovie)],
  readReviewsForMovie: [asyncErrorBoundary(movieExists), asyncErrorBoundary(readReviewsForMovie)],
}


