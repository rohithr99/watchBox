const mongoose = require("mongoose");

const watchlistSchema = new mongoose.Schema({
    tmdbId: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    genre: [
        {
            _id: false,
            id: {
                type: Number,
                required: true
            },
            name: {
                type: String,
                required: true
            },
        },
    ],
    vote: {
        type: Number,
        required: true
    },
    watched: {
        type: Boolean,
        default: false
    }
});

const Watchlist = mongoose.model('Watchlist', watchlistSchema);

module.exports = Watchlist;