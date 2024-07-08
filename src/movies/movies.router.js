const router = require('express').Router()
const controller = require('./movies.controller')
const methodNotAllowed = require('../errors/methodNotAllowed')
const notFound = require("../errors/notFound");

router.route('/').get(controller.list).all(methodNotAllowed)

router.route('/:movieId/theaters').get(controller.readTheatersForMovie).all(methodNotAllowed)

router.route('/:movieId/reviews').get(controller.readReviewsForMovie).all(methodNotAllowed)

router.route('/:movieId/critics').all(notFound)

router.route('/:movieId').get(controller.read).all(methodNotAllowed)



module.exports = router