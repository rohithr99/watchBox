import React, { useEffect, useState } from 'react'
import "./Watchlist.css"
import axios from 'axios';
const Watchlist = () => {

  const [data, setData] = useState([]);

  const fetchWatchlist = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/viewWatchlist`);
      console.log(response.data.watchlist);  
      setData(response.data.watchlist);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchWatchlist();
  }, []);

  return (
    <div>
      {
        data?.map((i) => (
          <div className="card_small" key={i._id}>
            <img src={`https://image.tmdb.org/t/p/w500/${i.image}`} alt="image" style={{ width: "100%" }} />
            <h1>{i.title}</h1>
            <p className="title_movie"></p>
            <p></p>
            <p><button>Add to Watched</button></p>
          </div>
        ))
      }

    </div>
  )
}

export default Watchlist