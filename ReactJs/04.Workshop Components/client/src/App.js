import { useEffect, useState } from 'react';
import * as userService from "./service/userService";
import Footer from "./components/Footer";
import Heather from "./components/Heather";
import Search from "./components/Search";
import UserList from "./components/UserList";
import './App.css'

function App() {
    const [users, setUsers] = useState([])
    useEffect(() => {
        userService.getAll()
        .then(setUsers)
        .catch(err => {
            console.log(err);
        });

    }, []);
    return (
        <>
            <Heather />
            <main className="main">
                <section className="card users-container">
                    <Search />
                    <UserList users={users}/>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default App;
