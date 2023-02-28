import './App.css';
import MovieList from './components/MovieList';
import { movies } from './movies';

function App() {

    return (
        <div className="App">
            <h1>Movie calatog</h1>
            <hr />
            <MovieList movies={movies} />
        </div>
    );
}

export default App;
