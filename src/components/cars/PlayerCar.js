import React from 'react'
import { useState, useEffect } from 'react';
import { Sprite, useTick, } from '@inlet/react-pixi'

let offset = false;

const PlayerCar = ({ carProps }) => {
    let { x, y, carWidth, carHeight, image, } = carProps;

    let [yPosition, setYPosition] = useState(y);

    useTick((delta) => {
        const d = offset ? -1.5 : 1.5;
        setYPosition(() => yPosition += d);
        offset = !offset;
    });

    useEffect(() => {

    }, [carProps]);
    return (
        <Sprite
            image={image}
            x={x}
            y={yPosition}
            width={carWidth}
            height={carHeight}
        />
    )
}

export default PlayerCar
