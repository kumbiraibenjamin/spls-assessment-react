import React from 'react'
import { useState, useEffect } from 'react';
import { Sprite } from '@inlet/react-pixi';

import mountain_right from '../../assets/mountain_right.png';

const MountainRight = ({ mountainRProps }) => {

    let { x, y, scale, anchor } = mountainRProps;

    let [xPosition, setXPosition] = useState(x);
    let [yPosition, setYPosition] = useState(y);
    let [scaleSize, setScaleSize] = useState(scale);

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
                anchor={anchor}
            />
        </>
    )
}

export default MountainRight
