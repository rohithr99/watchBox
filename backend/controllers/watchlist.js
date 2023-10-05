const Watchlist = require('../models/watchlistModel');

const deleteWatchlistMovie =  async (req, res) => {
    try{
        const { id } = req.params ;
        const response = await Watchlist.findByIdAndDelete({ _id: id });
        res.status(200).json({ message: "Movie deleted from the watchlist", response }); 
     }catch(err){
        res.status(404).json({ message: "Failed to delete" });
    }
}

module.exports = {
    deleteWatchlistMovie
}