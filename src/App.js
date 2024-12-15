import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard'

// https://www.omdbapi.com/apikey.aspx 
// a4d8d58d OMDB apikey

const API_URL = 'http://www.omdbapi.com?apikey=a4d8d58d';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [Search, setSearch] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);

    }

    useEffect(() => {
        searchMovies('Spiderman');
    }, [])

    return (
        <div className='app'>
            <h1>MovieLand</h1>
            <div className='search'>
                <input
                    placeholder='Search for movies'
                    value={Search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="Search Icon"
                    onClick={() => searchMovies(Search)}
                />
            </div>

            {
                movies?.length > 0
                    ? (
                        <div className='container'>
                            {movies.map((movie) => (
                                <MovieCard movie={movie} />
                            ))}
                        </div>
                    ) :
                    (
                        <div className='empty'>
                            <h2>No Movies Found!</h2>
                        </div>
                    )
            }
        </div>
    )
}

export default App;