import React, { useState, useEffect } from "react";
import Snake from "./Snake";
import Food from "./Food";

const App = () => {
    const [snakeDots, setSnakeDot] = useState([[0, 0], [2, 0], [4, 0]]);
    const [food, setFood] = useState([Math.floor((Math.random() * 100 / 2)) * 2, Math.floor((Math.random() * 100 / 2)) * 2]);
    const [direction, setDirection] = useState('RIGHT');
    const [speed, setSpeed] = useState(200);

    useEffect(() => {
        const interval = setInterval(moveSnake, speed);
        document.onkeydown = onKeyDown;

        return () => clearInterval(interval)
    })

    useEffect(() => {
        checkIfOut();
        checkIfCollapsed();
        checkIfEat();
    })

    const onKeyDown = (e) => {
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

    const checkIfOut = () => {
        let head = snakeDots[snakeDots.length - 1];
        if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
            gameOver();
        }
    }

    const checkIfCollapsed = () => {
        let snake = [...snakeDots];
        let head = snake[snake.length -1];
        snake.pop();
        snake.forEach(dot => {
            if (head[0] === dot[0] && head[1] === dot[1]) {
                gameOver();
            }
        })
    }

    const checkIfEat = () => {
        let head = snakeDots[snakeDots.length - 1];
        if (head[0] === food[0] && head[1] === food[1]) {
            setFood([Math.floor((Math.random() * 100 / 2)) * 2, Math.floor((Math.random() * 100 / 2)) * 2]);
            enLargeSnake();
            increaseSpeed();
        }
    }

    const enLargeSnake = () => {
        let newSnake = [...snakeDots];
        newSnake.unshift([]);
        setSnakeDot(newSnake);
    }

    const increaseSpeed = () => {
        if (speed > 50) {
            setSpeed(speed - 10);
        }
    }

    const gameOver = () => {
        alert(`game over`)
        setSnakeDot([[0, 0], [2, 0], [4, 0]]);
        setFood([Math.floor((Math.random() * 100 / 2)) * 2, Math.floor((Math.random() * 100 / 2)) * 2])
        setDirection('RIGHT')
        setSpeed(200)
    }

    return (
        <div className="wrapper">
            <Snake snakeDots={snakeDots} />
            <Food food={food} />
        </div>
    );
};

export default App;
