import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Cards from './Cards';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useState([]);
  const [username, setUsername] = useState("");
  const [activeButton, setActiveButton] = useState("popular");
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async (endpoint) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/movies/${endpoint}`);
      setData(response.data.results);
    } catch (err) {
      console.log(err);
    }
  }

  console.log(data);

  const handleSearch = async () => {
    try{
      const response = await axios.get(`http://localhost:8000/api/movies/search?query=${searchQuery}`);
      // console.log(response.data.movies);
      setData(response.data.movies.results);
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData('popular');
  }, []);

  const handleButtonClick = (endpoint) => {
    setActiveButton(endpoint);
    fetchData(endpoint);
  }

  const addToWatchlist = async (tmdbId) => {
    try{
      const response = await axios.get(`http://localhost:8000/api/addToWatchlist/${tmdbId}`);
      console.log(response);
    }catch(err){
      console.log(err.message);
    }
  }

  return (
    <div>
      <div className='flex justify-center p-5'>
        <input type="text" placeholder="  search movies..." className='bg-black text-white w-1/2 rounded-full' onChange={(e) => setSearchQuery(e.target.value)} />
        <button className='p-2 ms-2 bg-black text-white rounded-lg' onClick={handleSearch}>Search</button>
      </div>
      <div className='flex justify-center main pb-6'>
        <button className={`bg-red-400 m-1 ${activeButton === 'popular' ? 'bg-rose-500' : ''}`} onClick={() => handleButtonClick('popular')}>Popular</button>
        <button className={`bg-red-400 m-1 ${activeButton === 'top_rated' ? 'bg-rose-500' : ''}`} onClick={() => handleButtonClick('top_rated')}>Top Rated</button>
        <button className={`bg-red-400 m-1 ${activeButton === 'upcoming' ? 'bg-rose-500' : ''}`} onClick={() => handleButtonClick('upcoming')}>Upcoming</button>
        <button className={`bg-red-400 m-1 ${activeButton === 'now_playing' ? 'bg-rose-500' : ''}`} onClick={() => handleButtonClick('now_playing')}>Now Playing</button>
      </div>
      <Cards data={data} onAddToWatchlist={addToWatchlist}></Cards>
    </div>
  )
}

export default Home