import './App.css';
import { useState } from 'react'
import MovieList from './components/MovieList';
import { movies as movieData } from './movies';

function App() {
    const [movies, setMovies] = useState(movieData);
    const onMovieDelete = (id) => {
        setMovies(state => state.filter(x => x._id !== id));
    }

    const onMovieSelect = (id) => {
        setMovies(state => state.map(x => ({...x, selected: x._id === id})));
    }

    return (
        <div className="App">
            <h1>Movie calatog</h1>
            <hr />
            <MovieList 
                movies={movies} 
                onMovieDelete={onMovieDelete} 
                onMovieSelect={onMovieSelect}
            />
        </div>
    );
}

export default App;
