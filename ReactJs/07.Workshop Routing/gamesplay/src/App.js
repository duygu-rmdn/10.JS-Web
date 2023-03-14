import { useNavigate, Route, Routes} from 'react-router-dom';
import { useEffect, useState,  } from 'react';
import * as gameService from './services/gameService';
import { Header } from "./components/Header/Header";
import { Catalog } from "./components/Catalog/Catalog";
import { Home } from "./components/Home/Home";
import { Create } from "./components/CreateGame/CreateGame";
import { Details } from "./components/Details/Details";
import { Edit } from "./components/Edit/Edit";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";

function App() {
    const navidate = useNavigate();
    const [games, setGames] = useState([]);

    useEffect(() => {
        gameService.getAll()
        .then(result => setGames(result));
    }, []);

    const onCreateGameSubmit = async (data) => {
        const newGame = await gameService.create(data);

        setGames(state => [...state, newGame]);

        navidate('/catalog');
    } 
    
    return (
        <div id="box">
            <Header />
            <main id="main-content">
                <Routes> 
                    <Route path='/' element={<Home/>} />
                    <Route path='/catalog' element={<Catalog games={games}/>} />
                    <Route path='/create' element={<Create onCreateGameSubmit={onCreateGameSubmit}/>} />
                    <Route path='/catalog/:gameId' element={<Details />} />
                    <Route path='/edit' element={<Edit/>} />
                    <Route path='/login' element={<Login/>} />
                    <Route path='/register' element={<Register/>} />
                </Routes>
            </main>

        </div>
    );
}

export default App;
