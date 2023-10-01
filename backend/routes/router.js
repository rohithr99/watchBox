//import express
const express = require('express');
const { signUp, login } = require('../controllers/AuthController'); 
const { userVerification } = require('../middlewares/AuthMiddleware');
const { getPopular, getTopRated, getUpcoming, getNowPlaying, viewMovieDetails, addToWatchlist, getWatchlist } = require('../controllers/tmdb');
//initialize router
const router = express.Router();


//post register
router.post('/signup',signUp);

//get login
router.post('/login',login);

//authentication middleware
router.post('/',userVerification);

//fetch popular movies data from tmdb
router.get('/api/movies/popular',getPopular);

//fetch top_rated movies list from tmdb
router.get('/api/movies/top_rated',getTopRated);

//route for Upcoming movies
router.get('/api/movies/upcoming',getUpcoming);

//route for now playing movies
router.get('/api/movies/now_playing',getNowPlaying);

//route for single view
router.get('/api/movieDetails/:tmdbId',viewMovieDetails)

//add to watchlist
router.get('/api/addToWatchlist/:tmdbId',addToWatchlist);

//get watchlist
router.get("/api/viewWatchlist",getWatchlist);
//delete watchlist 

//delete watched list

//user can give rating...(optional) // will do according to time available

//edit account details

//delete account

module.exports = router;