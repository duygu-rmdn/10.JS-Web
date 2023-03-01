import { useEffect } from 'react'
import styles from './Movie.module.css'

export default function Movie({
    _id,
    title,
    year,
    poster,
    genre,
    onMovieDelete,
    onMovieSelect,
    selected
}) {

    useEffect(() => {
        console.log(`${title} - mounted!`)
        
        return () => {
            console.log(`${title} - unmounted!`)
        }
    }, []);

    useEffect(() => {
        console.log(`${title} - updated!`)
    }, [selected]);

    return (
        <article className={styles['movie-article']}>
            <h2>{title}</h2>
            {selected && <p>Selected!</p>}
            <p>{year}</p>
            <p>{genre}</p>
            <img src={poster} alt={title} />

            <footer>
                <button onClick={() => onMovieDelete(_id)}>Delete</button>
                <button onClick={() => onMovieSelect(_id)}>Select</button>
            </footer>
        </article>
    );
};
