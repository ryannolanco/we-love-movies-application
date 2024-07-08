const knex = require('../db/connection')

const mapProperties = require('../utils/map-properties')

function readReview(review_id) {
  return knex("reviews").select("*").where({ review_id }).first();
}


const addCritic = mapProperties({
  critic_id: 'critic.critic_id',
  preferred_name: 'critic.preferred_name',
  surname: 'critic.surname',
  organization_name: 'critic.organization_name',
  created_at: 'critic.created_at',
  updated_at: 'critic.updated_at',
})




function update(updatedReview) {
  return knex('reviews')
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, '*')
    .then(updatedRecords => updatedRecords[0])
    .then(review => {
      return knex('reviews')
        .join('critics', 'reviews.critic_id', 'critics.critic_id')
        .select('reviews.*', 'critics.critic_id', 'critics.preferred_name', 'critics.surname', 'critics.organization_name', 'critics.created_at as critic_created_at', 'critics.updated_at as critic_updated_at')
        .where('reviews.review_id', review.review_id)
        .first()
        .then(result => {
          result.critic = {
            critic_id: result.critic_id,
            preferred_name: result.preferred_name,
            surname: result.surname,
            organization_name: result.organization_name,
            created_at: result.critic_created_at,
            updated_at: result.critic_updated_at
          };
          delete result.critic_created_at;
          delete result.critic_updated_at;
          delete result.preferred_name;
          delete result.surname;
          delete result.organization_name;
          return result;
        });
    });
}

function destroy(review_id) {
  return knex("reviews").where({ review_id }).del();
}

module.exports = {
  readReview,
  update,
  delete: destroy,
}