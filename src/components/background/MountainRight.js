import React from 'react'
import { useState, useEffect } from 'react';
import { Sprite, useTick } from '@inlet/react-pixi';

import mountain_right from '../../assets/mountain_right.png';

const MountainRight = ({ mountainRProps }) => {

    let { x, y, scale } = mountainRProps;

    let [xPosition, setXPosition] = useState(x);
    let [yPosition, setYPosition] = useState(y);
    let [scaleSize, setScaleSize] = useState(scale);

    useTick(() => {
        if (scaleSize > 0) {
            setXPosition(() => xPosition += 10);
            setYPosition(() => yPosition += 2);
            setScaleSize(() => scaleSize += 0.003);
        }
    });

    useEffect(() => {
        setYPosition(y);
        setXPosition(x);
        setScaleSize(scale);
    }, [mountainRProps]);

    return (
        <>
            <Sprite
                image={mountain_right}
                x={xPosition}
                y={yPosition}
                scale={scaleSize}
            />
        </>
    )
}

export default MountainRight
