import './App.css';
import Movie from './components/Movie';
import MovieList from './components/MovieList';

function App() {
    const movies = [
        {name: "Spiderman", year: 2008, actors: ['sdfdsf', 'HNJde s']},
        {name: "Avartat", year: 2017, actors: ['dsfds', 'dd s']},
        {name: "Marver", year: 2015, actors: ['svfsdfcsdfcd', 'hjhhhhhh']}

    ]
    return (
        <div className="App">
        <MovieList movies={movies} />
        </div>
    );
}

export default App;
