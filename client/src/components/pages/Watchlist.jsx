import React, { useEffect, useState } from 'react'
import "./Watchlist.css"
import axios from 'axios';
const Watchlist = () => {

  const [data, setData] = useState([]);

  const fetchWatchlist = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/viewWatchlist`);
      // console.log(response.data.watchlist);
      setData(response.data.watchlist);
    } catch (err) {
      console.log(err);
    }
  }

  const markAsWatched = async (id) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/watchlist/${id}`);
      // console.log(response);
      setData((prevData) => prevData.map((item) => (item._id === id ? { ...item, watched: true } : item)));
      fetchWatchlist();
    } catch (err) {
      console.log(err);
    }
  }

  const handleDeleteMovie = async ( id ) => {
    try{
      const response = await axios.delete(`http://localhost:8000/api/deleteWatchlist/${id}`);
      // console.log(response);
      fetchWatchlist();
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    fetchWatchlist();
  }, []);

  return (
    <div className='grid grid-cols-4 pt-10 container mx-auto gap-4'>
      {
        data?.map((i) => (
          <div className="max-w-sm rounded flex flex-col overflow-hidden shadow-lg text-center" key={i._id}>
            <img src={`https://image.tmdb.org/t/p/w500/${i.image}`} alt="image" style={{ width: "100%" }} />
            <div className='px-6 py-4 grow'>
              <h1 className='font-bold text-xl mb-2'>{i.title}</h1>
              <p className="text-gray-700 text-base"></p>
              <p></p>
            </div>
            <div className='flex inline-block justify-between'>{
              i.watched ? <h3 className='bg-green-400 p-2 w-1/2 rounded'>Watched</h3> :
                <button className="w-1/2 bg-black text-white p-2 rounded hover:bg-gray-700" onClick={() => markAsWatched(i._id)}>Mark as watched</button>
            }
            <button className='bg-red-500 w-1/2 rounded hover:bg-red-400' onClick={() => handleDeleteMovie(i._id)}>Delete</button>
            </div>
          </div>
        ))
      }

    </div>
  )
}

export default Watchlist