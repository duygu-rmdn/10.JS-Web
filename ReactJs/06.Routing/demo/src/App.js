import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home } from './components/Home';
import { About } from './components/About';
import { NotFound } from './components/404';
import { MainNavigation } from './components/MainNavigation';
import { CharectersList } from './components/CharectersList';
import { Charecter } from './components/Charecter';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <MainNavigation />
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/about' element={<About />}></Route>
                    <Route path='/charecters' element={<CharectersList />}></Route>
                    <Route path='/charecters/:charecterId/*' element={<Charecter />}></Route>
                    <Route path='*' element={<NotFound />}></Route>
                </Routes>
            </header>
        </div>
    );
}

export default App;
