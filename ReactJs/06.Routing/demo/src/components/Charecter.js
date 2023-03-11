import { useEffect, useState } from "react";
import { useNavigate, useParams, Link, Routes, Route } from "react-router-dom";
import { ChrecterFilms } from "./CharecterFilms";
import { Navigation } from "./Navigation";

const baseUrl = 'https://swapi.dev/api/people';

export const Charecter = () => {
    const {charecterId} = useParams();
    const navigate = useNavigate();

    const [charecter, setCharecter] = useState([]);
    useEffect(() => {
        fetch(`${baseUrl}/${charecterId}`)
        .then(res =>res.json())
        .then(data => setCharecter(data));

    }, [charecterId]);

    const onButtonBackClick = () => {
        navigate('/charecters');
    }

    return (
        <>
            <h1>Charecter page</h1>
            <p>{charecter.name}</p>
            <button onClick={onButtonBackClick}>Back</button>

            <Navigation>
                    <li><Link to="films" >Films</Link></li>
                    <li><Link to="vachicles" >Vachicles</Link></li>
                    <li><Link to="starships" >Starships</Link></li>
            </Navigation>

            <Routes>
                <Route path="/films" element={<ChrecterFilms/>}></Route>
                <Route path="/vachicles" element={<div>Vachicles</div>}></Route>
                <Route path="/starships" element={<div>Starships</div>}></Route>
            </Routes>
        </>
    );
};