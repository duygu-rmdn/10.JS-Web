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

    const onUserCreateSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);

        const createdUser = await userService.create(data);
        setUsers(state => [...state, createdUser]);
    }

    const onUserDelete = async (userId) => {
        await userService.remove(userId);

        setUsers(state => state.filter(x => x._id !== userId));
    };

    const OnUserUpdateSubmit = async (e, userId) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);
        
        const updatedUser = await userService.modify(userId, data);
        setUsers(state => state.map(x => x._id === userId ? updatedUser : x));
    }


    return (
        <>
            <Heather />
            <main className="main">
                <section className="card users-container">
                    <Search />
                    <UserList users={users}
                        onUserCreateSubmit={onUserCreateSubmit}
                        OnUserUpdateSubmit={OnUserUpdateSubmit}
                        onUserDelete={onUserDelete}
                    />


                </section>
            </main>
            <Footer />
        </>
    );
}

export default App;
