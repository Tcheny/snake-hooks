import React from 'react';

export default (props) => {
    const style = {
        left: `${props.food[0]}%`,
        top: `${props.food[1]}%`
    }
    return (

            <i style={style} className="food fas fa-apple-alt"></i>


    )
}
