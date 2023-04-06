import { React, useEffect, useState } from 'react';
import "./App.css";
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';


const API_URL = `http://www.omdbapi.com?apikey=${process.env.REACT_APP_MOVIELAND_API_KEY}`


const App = () => {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('');

    //Fetch data from API
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json();

        setMovies(data.Search);
    }

    //Default search
    useEffect(() => {
        searchMovies('Disney');
    }, [])


    return (
        <div className='app'>
            <h1>MovieLand</h1>

            <div className='search'>
                <input placeholder='Search title' value={search} onChange={(title) => {setSearch(title.target.value) }} />

                <img src={SearchIcon} alt="search" onClick={() => searchMovies(search)} />
            </div>

            {
                movies?.length > 0 ?
                    <div className='container'>
                        {movies.map((movie) => (
                            <MovieCard movie={movie} />
                        ))}
                    </div>
                    :
                    <div className='empty'>
                        <h2>No movies found</h2>
                    </div>

            }


        </div>
    );
}


export default App;