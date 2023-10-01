const axios = require("axios");
const Watchlist = require("../models/watchlistModel");
require('dotenv').config();
const apiKey = process.env.API_KEY;
const apiUrl = process.env.API_URL;


getPopular = async (req, res) => {
    try{
        const response = await axios.get(`${apiUrl}movie/popular?api_key=${apiKey}`);
        // const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=ce7725865e3d6301c8215155bc7cd128`);
        const  data  = response.data;
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Error fetching popular movies from TMDB database"});
    }
}

getTopRated = async (req, res) => {
    try{
        const response = await axios.get(`${apiUrl}movie/top_rated?api_key=${apiKey}`);
        const data = response.data;
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Error fetching top rated movies from TMDB database"});
    }
}

getUpcoming = async (req, res) => {
    try{
        const response = await axios.get(`${apiUrl}movie/upcoming?api_key=${apiKey}`);
        const { data } = response;
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Error fetching upcoming movies from TMDB database"})
    }
}

getNowPlaying = async (req, res) => {
    try{
        const response = await axios.get(`${apiUrl}movie/now_playing?api_key=${apiKey}`);
        const { data } = response;
        res.status(200).json(data);
    }catch(err){ 
        console.log(err);
        res.status(500).json({message: "Error fetching now playing movies from TMDB database"});
    }
}

viewMovieDetails = async (req, res) => {
    try{
        const tmdbId = req.params.tmdbId;
        const response = await axios.get(`${apiUrl}movie/${tmdbId}?api_key=${apiKey}`);
        const data = response.data;
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Error fetching movie details from TMDB database"});
    }
}

addToWatchlist = async (req, res) => {
    try{
        const tmdbId = req.params.tmdbId;

        //checking if the movie is already in the database or not
        const existingMovie = await Watchlist.findOne({ tmdbId });

        if(existingMovie){
            res.status(404).json({message: "Movie is already in watchlist", success: false});
        }

        //fetch movie data from TMDB API
        const response = await axios.get(`${apiUrl}movie/${tmdbId}?api_key=${apiKey}`);
        const movieData = response.data;

        const watchlistData = {
            tmdbId : movieData.id,
            title : movieData.title,
            image : movieData.backdrop_path,
            genre : movieData.genres.map((genre) => ({
                id: genre.id,
                name : genre.name
            })),
            vote : movieData.vote_average
        };

        const watchlistItem = new Watchlist(watchlistData);
        await watchlistItem.save();

        res.json({success : true, message : "Movie added to watchlist", movie: watchlistItem});

    }catch(err){
        console.log(err);
        res.status(500).json({ message : "Error fetching the movie from TMDB database"});
    }
}

//getWatchlist
getWatchlist = async (req, res) => {
    try{
        const response = await Watchlist.find();
        res.status(200).json({message: "watchlist fetched successfully",success: true, watchlist: response});
    }catch(err){
        console.log(err);
        res.status(400).json({message: "error fetching watchlist", success: false});
    }
}
 
module.exports = {
    getPopular, getTopRated, getUpcoming, getNowPlaying, viewMovieDetails, addToWatchlist, getWatchlist
};