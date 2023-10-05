import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Watched = () => {

  const [watchedMovies, setWatchedMovies] = useState([]);

  const fetchWatchedMovies = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/watched`);
      // console.log(response.data.watched);
      setWatchedMovies(response.data.watched);
    } catch (err) {
      console.log(err);
    }
  }

  const handleRemove = async (id) => {
    try{
      const response = await axios.put(`http://localhost:8000/api/removeWatched/${id}`);
      // console.log(response);
      fetchWatchedMovies();
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    fetchWatchedMovies();
  }, []);

  return (
    <div>
      {
        watchedMovies?.map((item) => (
          <div className='max-w-sm rounded overflow-hidden shadow-lg text-center' key={item._id}>
            <img src={`https://image.tmdb.org/t/p/w500/${item.image}`} alt="image" className='w-full' />
            <div className='px-6 py-4'>
              <h2 className='font-bold text-xl mb-2'>{item.title}</h2>
              <p className='text-gray-700 text-base'></p>
            </div>
            <div className='px-6 pt-4 pb-2'>
              <button type="button" className='bg-red-400 p-2 rounded-lg' onClick={() => handleRemove(item._id)}>remove</button>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Watched