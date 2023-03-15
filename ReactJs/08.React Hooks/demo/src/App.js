import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { AddTodoModal } from './components/AddTodoModal';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';

const baseUrl = 'http://localhost:3030/jsonstore/todos';

function App() {
    const [todos, setTodos] = useState([]);
    const [showAddTodo, setShowAddTodo] = useState(false);

    useEffect(() => {
        fetch(baseUrl)
        .then(res => res.json())
        .then(result => {
            setTodos(Object.values(result));
        });
    }, []);

    const onTodoAddSubmit = async (values) => {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'content-type': 'applicatin/json'
            },
            body: JSON.stringify(values)
        });
        const result = await response.json();

        console.log(result)
    };

    const onTodoAddClick = () => {
        setShowAddTodo(true);   
    }

    return (
        <div>
            <Header />
            <TodoList todos={todos} onTodoAddClick={onTodoAddClick}/>
            <AddTodoModal show={showAddTodo} onTodoAddSubmit={onTodoAddSubmit}/>
        </div>
    );
}

export default App;
