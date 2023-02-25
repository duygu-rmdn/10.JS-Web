const Movie = (props) => {
    return (
    <article>
        <h3>{props.name}</h3>
        <p>{props.year}</p>
        <p>{props.actors[0]}</p>
    </article>)
}

export default Movie