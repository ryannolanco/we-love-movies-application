const knex = require('../db/connection')

const mapProperties = require('../utils/map-properties')

//retrieve all movies
function list() {
  return knex('movies').select('*')
}

//retrieve movies if isShowing is true
function listIsShowing() {
  return knex('movies as m')
    .distinct('m.*')
    .join('movies_theaters as mt', 'm.movie_id', 'mt.movie_id')
    .where({ "mt.is_showing": true });
}
//retrieve specific movie information
function read(movieId) {
  return knex('movies').select("*").where({ 'movie_id': movieId }).first()
}

//retrieve theaters where a specific movie is playing

function readTheatersForMovie(movieId) {
  return knex('movies as m')
    .join('movies_theaters as mt', 'm.movie_id', 'mt.movie_id')
    .join('theaters as t', 't.theater_id', 'mt.theater_id')
    .select('t.*')
    .where({ 'm.movie_id': movieId })
}



//retrieve reviews for specific movie

//create critic info object
const addCritic = mapProperties({
  critic_id: 'critic.critic_id',
  preferred_name: 'critic.preferred_name',
  surname: 'critic.surname',
  organization_name: 'critic.organization_name',
  created_at: 'critic.created_at',
  updated_at: 'critic.updated_at',
})


function readReviewsForMovie(movieId) {
  return knex('movies as m')
    .join('reviews as r', 'm.movie_id', 'r.movie_id')
    .join('critics as c', 'r.critic_id', 'c.critic_id')
    .select("r.*", 'c.*')
    .where({ 'm.movie_id': movieId })
    .then((reviews) => reviews.map(addCritic));
}



module.exports = {
  list,
  listIsShowing,
  read,
  readTheatersForMovie,
  readReviewsForMovie,
}

