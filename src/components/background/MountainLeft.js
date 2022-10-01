import React from 'react'
import { useState, useEffect } from 'react';
import { Sprite, useTick } from '@inlet/react-pixi';

import mountain_left from '../../assets/mountain_left.png';

const MountainLeft = ({ mountainLProps }) => {

    let { x, y, scale, anchor } = mountainLProps;

    let [xPosition, setXPosition] = useState(x);
    let [yPosition, setYPosition] = useState(y);
    let [scaleSize, setScaleSize] = useState(scale);

    useTick((delta) => {
        if (scaleSize > 0) {
            // setXPosition(() => xPosition -= 3);
            // setYPosition(() => yPosition += 0.725);
            // setScaleSize(() => scaleSize += 0.001);
        }
    });

    useEffect(() => {
        setYPosition(y);
        setXPosition(x);
        setScaleSize(scale);
    }, [mountainLProps]);

    return (
        <>
            <Sprite
                image={mountain_left}
                x={xPosition}
                y={yPosition}
                scale={scaleSize}
                anchor={anchor}
            />
        </>
    )
}

export default MountainLeft
