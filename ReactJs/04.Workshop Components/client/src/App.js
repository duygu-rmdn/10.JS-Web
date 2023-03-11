import { useEffect, useState } from 'react';
import * as userService from "./service/userService";
import Footer from "./components/Footer";
import Heather from "./components/Heather";
import Search from "./components/Search";
import UserList from "./components/UserList";
import './App.css'

function App() {
    const [users, setUsers] = useState([]);
    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
    })
    const [formErrors, setFormErrors] = useState({
        firstName: '',
        lastName: '',
    });

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
        //const createdUser = await userService.create(formValues);
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
    };

    const formChangeHandler = (e) => {
        setFormValues(state => ({...state, [e.target.name]: e.target.value}));
    };

    const validateForm = (e) => {
        const value = e.target.value;
        const errors = {};

        if (e.target.name === 'firstName' && (value.length < 3 || value.length > 20)) {
            errors.firstName = 'FirstName should be between 3 and 20 charecters long!';
        }

        if (e.target.name === 'lastName' && (value.length < 3 || value.length > 20)) {
            errors.lastName = 'lastName should be between 3 and 20 charecters long!';
        }

        setFormErrors(errors);
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
                        formValues={formValues}
                        formChangeHandler={formChangeHandler}
                        formErrors={formErrors}
                        validateForm={validateForm}
                    />


                </section>
            </main>
            <Footer />
        </>
    );
}

export default App;
