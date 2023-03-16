import 'bootstrap/dist/css/bootstrap.min.css';
import { TodoContext } from './contexts/todoContext';
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

        setShowAddTodo(false);
        setTodos(state => [...state, result]);
    };

    const onTodoDeleteClick = async (todoId) => {
        const response = await fetch(`${baseUrl}/${todoId}`, { method: 'DELETE' });
        setTodos(state => state.filter(x => x._id !== todoId));
    };

    const onTodoClick = async (todoId) => {
        const todo = todos.find(x => x._id === todoId);
        const response = await fetch(`${baseUrl}/${todoId}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'applicatin/json'
                },
                body: JSON.stringify({...todo, isCompleted: !todo.isCompleted})
            });
        setTodos(state => state.map(x => x._id === todoId ? { ...x, isCompleted: !x.isCompleted } : x));
    }

    const onTodoAddClick = () => {
        setShowAddTodo(true);
    };

    const onTodoAddClose = () => {
        setShowAddTodo(false);
    };

    const contextValue = {
        onTodoDeleteClick,
        onTodoClick,
    };

    return (
        <TodoContext.Provider value={contextValue}>
            <div>
                <Header />
                <TodoList todos={todos} onTodoAddClick={onTodoAddClick} />
                <AddTodoModal show={showAddTodo} onTodoAddSubmit={onTodoAddSubmit} onTodoAddClose={onTodoAddClose} />
            </div>
        </TodoContext.Provider>
    );
}

export default App;
