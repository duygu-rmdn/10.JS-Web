import Movie from "./Movie";

const MovieList = (props) => {
    return <div>
        <Movie
            name={props.movies[0].name}
            year={props.movies[0].year}
            actors={props.movies[0].actors}
        />
        <Movie
            name={props.movies[1].name}
            year={props.movies[1].year}
            actors={props.movies[1].actors}
        /> 
        <Movie
            name={props.movies[2].name}
            year={props.movies[2].year}
            actors={props.movies[2].actors}
        />
    </div>
};

export default MovieList;