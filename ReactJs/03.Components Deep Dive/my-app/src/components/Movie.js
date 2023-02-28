export default function Movie({
    title,
    year,
    poster,
    genre
}) {
    return (
        <article>
            <h2>{title}</h2>
            <p>{year}</p>
            <p>{genre}</p>
            <img src={poster} alt={title} />
        </article>
    );
};
