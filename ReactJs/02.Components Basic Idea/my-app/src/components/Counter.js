import { useState } from "react";

const Counter = (props) => {
    const [counter, setCounter] = useState(0);

    const increment = () => {
        setCounter(state => state + 1);
    };

    const decrement = () => {
        setCounter(state => state - 1);
    };

    const setZero = () => {
        setCounter(0);
    };


    return (
        <div>
            <div>Counter: {counter}</div>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
            <button onClick={setZero}>0</button>
        </div>
    )
}
export default Counter;