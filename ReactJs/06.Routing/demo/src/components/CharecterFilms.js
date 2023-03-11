import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const baseUrl = 'https://swapi.dev/api';

export const ChrecterFilms = () => {

    const { charecterId } = useParams();
    const [films, setFilms] = useState([]);

    useEffect(() => {
        fetch(`${baseUrl}/films`)
        .then(res => res.json())
        .then(data => setFilms(data.results))
    }, [charecterId])

    return (
        <>
        <div>Fiiiiiilms!</div>
        {films.map(x => {
            const id = x.url.split('/').filter(x => x).pop();
            return <li key={id}><Link to={`/films/${id}`}>{x.title}</Link></li>
        })}
        </>
    )
}