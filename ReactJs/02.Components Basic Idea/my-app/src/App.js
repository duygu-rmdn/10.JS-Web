import './App.css';
import Counter from './components/Counter';
import MovieList from './components/MovieList';
import Timer from './components/Timer';

function App() {
    const movies = [
        {name: "Spiderman", year: 2008, actors: ['sdfdsf', 'HNJde s']},
        {name: "Avartat", year: 2017, actors: ['dsfds', 'dd s']},
        {name: "Marver", year: 2015, actors: ['svfsdfcsdfcd', 'hjhhhhhh']}

    ]
    return (
        <div className="App">
        <Counter />
        <Timer start={0}/>
        <Timer start={50}/>
        <MovieList movies={movies} />
        </div>
    );
}

export default App;
