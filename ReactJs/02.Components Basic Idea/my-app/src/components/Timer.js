import React from "react";

const Timer = (props) => {
    const [seconds, setSeconds] = React.useState(props.start);
    
    setTimeout(() => {
        setSeconds((seconds) => seconds + 1);
    }, 1000);

    return (
        <div>Timer: {seconds}s</div>
    )
}

export default Timer;