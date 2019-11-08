import React, { useState, useEffect } from "react";
import Snake from "./Snake";
import Food from "./Food";

const App = () => {
    const [snakeDots, setSnakeDot] = useState([[0, 0], [2, 0], [4, 0]]);
    const [food, setFood] = useState([Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)]);
    const [direction, setDirection] = useState('RIGHT');

    useEffect(() => {
        const interval = setInterval(moveSnake, 200);
        document.onkeydown = onKeyDown;

        return () => clearInterval(interval)
    })



    const onKeyDown = (e) => {
        // e = e || window.event;

        switch (e.keyCode) {
            case 38:
                setDirection('UP')
                break;
            case 40:
                setDirection('DOWN')
                break;
            case 37:
                setDirection('LEFT')
                break;
            case 39:
                setDirection('RIGHT')
                break;
            default:
                break;
        }
    }

    const moveSnake = () => {
        let dots = [...snakeDots];

        let head = dots[dots.length - 1];

        switch (direction) {
        case 'RIGHT':
            head = [head[0] + 2, head[1]];
            break;
        case 'LEFT':
            head = [head[0] - 2, head[1]];
            break;
        case 'DOWN':
            head = [head[0], head[1] + 2];
            break;
        case 'UP':
            head = [head[0], head[1] - 2];
            break;
        default:
            break;
        }

        dots.push(head);
        dots.shift();
        setSnakeDot(dots)

    }

    return (
        <div className="wrapper">
            <Snake snakeDots={snakeDots} />
            <Food food={food} />
        </div>
    );
};

export default App;
