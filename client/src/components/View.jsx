import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { GoStarFill } from "react-icons/go";

const View = () => {

    const [movieDetails, setMovieDetails] = useState([]);
    const tmdbId = useParams().tmdbId;
    const navigate = useNavigate();

    const fetchMovie = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/movieDetails/${tmdbId}`);
            console.log(response.data);
            setMovieDetails(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchMovie();
    }, []);

    return (
        <section>
            <div className="py-8 min-h-screen flex justify-center items-center">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row -mx-4">
                        <div className="md:flex-1 px-4">
                            <div className="h-[460px] rounded-lg bg-gray-300 mb-4">
                                <img className="w-full h-full object-cover rounded-lg" src={`https://image.tmdb.org/t/p/w500/${movieDetails.backdrop_path}`} alt="poster image" />
                            </div>
                            <div className="flex -mx-2 mb-4">
                                <div className="w-1/2 px-2">
                                    <button className="w-full bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800">Add to Watchlist</button>
                                </div>
                                    <div className="w-1/2 px-2">
                                        <button className="w-full bg-gray-400 text-gray-800 py-2 px-4 rounded-full font-bold hover:bg-gray-300" onClick={() => navigate('/home')}>Back to home</button>
                                    </div>
                            </div>
                        </div>
                        <div className="md:flex-1 px-4">
                            <h2 className="text-2xl font-bold mb-2">{movieDetails.title}</h2>

                            <div className="mb-4">
                                <span className="font-bold text-gray-700">Rating:</span>
                                <div className="flex items-center mt-2">
                                    <p className='text-yellow-500'> <GoStarFill className='inline'></GoStarFill> <span className='text-red-500'>{movieDetails.vote_average}</span></p>
                                </div>
                            </div>
                            <div className="mb-4">
                                <span className="font-bold text-gray-700">Genres:</span>
                                <div className="flex items-center mt-2">
                                    {
                                        movieDetails.genres?.map((genre) => {
                                            return (
                                                <div key={genre.id} className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400">{genre.name}</div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div>
                                <span className="font-bold text-gray-700">Overview:</span>
                                <p className="text-gray-600 text-sm mt-2">{movieDetails.overview}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default View