if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');
//error handler imports
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

const corsOptions = {
  methods: "OPTIONS, DELETE, GET, POST, PUT"  // Add other methods as needed
};

//when in the development environment cors is enabled for the entire app
// if (process.env.NODE_ENV === 'development') {
//   app.use(cors(corsOptions));
// }

app.use(cors(corsOptions));
app.use(express.json());

//movies router
const moviesRouter = require('./movies/movies.router')

app.use('/movies', moviesRouter)

//reviews router
const reviewsRouter = require('./reviews/reviews.router')

app.use('/reviews', reviewsRouter)

//theaters router
const theatersRouter = require('./theaters/theaters.router');


app.use('/theaters', theatersRouter)


//handle requests that dont exist
app.use(notFound)

//handle errors
app.use(errorHandler)

module.exports = app;

