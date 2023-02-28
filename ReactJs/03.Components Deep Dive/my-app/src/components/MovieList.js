import Movie from "./Movie";

export default function MovieList({movies}) {
    return (
        <ul>
            {movies.map(movie => (
                <li>
                    <Movie key={movie._id} {...movie} />
                </li>
            ))}
        </ul>
    )
}