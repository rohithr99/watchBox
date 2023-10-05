import React from 'react'
import './Cards.css'
import { Link } from 'react-router-dom'

const Cards = ({ data, onAddToWatchlist }) => {

    return (
        <div className="grid-container">{
            data?.map((i) => (
                <div className="card" key={i.id}>
                    <Link to={`/view/${i.id}`}>
                        <img src={`https://image.tmdb.org/t/p/w500/${i.poster_path}`} alt="image" style={{ width: "100%" }} className='rounded' />
                        <h1 className='font-bold'>{i.title}</h1>
                    </Link>
                    <p className="price text-red-500">{i.vote_average}</p>
                    <p>{i.release_date}</p>
                    <p><button className='text-red-400 rounded' onClick={() => onAddToWatchlist(i.id)}>Add to Watchlist</button></p>
                </div>
            ))
        }
        </div>
    )
}

export default Cards