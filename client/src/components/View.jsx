import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


const View = () => {

    const [movieDetails, setMovieDetails] = useState([]);
    const tmdbId = useParams().tmdbId;

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
                                    <button className="w-full bg-gray-400 text-gray-800 py-2 px-4 rounded-full font-bold hover:bg-gray-300">Back to home</button>
                                </div>
                            </div>
                        </div>
                        <div className="md:flex-1 px-4">
                            <h2 className="text-2xl font-bold mb-2">{movieDetails.title}</h2>
                            <p className="text-gray-600 text-sm mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
                                ante justo. Integer euismod libero id mauris malesuada tincidunt.</p>
                            <div className="flex mb-4">
                                <div className="mr-4">
                                    <span className="font-bold text-gray-700">Price:</span>
                                    <span className="text-gray-600">$29.99</span>
                                </div>
                                <div>
                                    <span className="font-bold text-gray-700">Availability:</span>
                                    <span className="text-gray-600">In Stock</span>
                                </div>
                            </div>
                            <div className="mb-4">
                                <span className="font-bold text-gray-700">Select Color:</span>
                                <div className="flex items-center mt-2">
                                    <button className="w-6 h-6 rounded-full bg-gray-800 mr-2"></button>
                                    <button className="w-6 h-6 rounded-full bg-red-500 mr-2"></button>
                                    <button className="w-6 h-6 rounded-full bg-blue-500 mr-2"></button>
                                    <button className="w-6 h-6 rounded-full bg-yellow-500 mr-2"></button>
                                </div>
                            </div>
                            <div className="mb-4">
                                <span className="font-bold text-gray-700">Select Size:</span>
                                <div className="flex items-center mt-2">
                                    <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400">S</button>
                                    <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400">M</button>
                                    <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400">L</button>
                                    <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400">XL</button>
                                    <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400">XXL</button>
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