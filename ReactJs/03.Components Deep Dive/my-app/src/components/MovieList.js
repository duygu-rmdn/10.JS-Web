import Movie from "./Movie";

export default function MovieList({
    movies,
    onMovieDelete,
    onMovieSelect
}) {
    return (
        <ul>
            {movies.map(movie => (
                <li key={movie._id}>
                    <Movie
                        {...movie}
                        onMovieDelete={onMovieDelete}
                        onMovieSelect={onMovieSelect}
                    />
                </li>
            ))}
        </ul>
    )
}