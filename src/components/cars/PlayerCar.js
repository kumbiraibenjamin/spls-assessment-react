import React from 'react'
import { useState, useEffect } from 'react';
import { Sprite, useTick, } from '@inlet/react-pixi'

let offset = 0;

const PlayerCar = ({ carProps }) => {
    let { x, y, scale, image } = carProps;

    let [yPosition, setYPosition] = useState(y);
    let [xPosition, setXPosition] = useState(x / 2);
    let [scaleSize, setScaleSize] = useState(scale);
    let [imageDir, setImageDir] = useState(image);

    useTick((delta) => {
        const d = offset += delta;
        setYPosition(() => yPosition += Math.cos(d));

    });

    useEffect(() => {
        setYPosition(y - (y * 0.3));
        setXPosition(x);
        setImageDir(image);
        setScaleSize(scale);

    }, [carProps]);
    return (
        <Sprite
            image={imageDir}
            x={xPosition}
            y={yPosition}
            anchor={0.5}
            scale={scaleSize}
        />

    )
}

export default PlayerCar
