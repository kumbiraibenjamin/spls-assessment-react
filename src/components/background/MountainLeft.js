import React from 'react'
import { useState, useEffect } from 'react';
import { Sprite, useTick } from '@inlet/react-pixi';

import mountain_left from '../../assets/mountain_left.png';

const MountainLeft = ({ mountainLProps }) => {

    let { x, y, scale } = mountainLProps;

    let [xPosition, setXPosition] = useState(x);
    let [yPosition, setYPosition] = useState(y);
    let [scaleSize, setScaleSize] = useState(scale);

    useTick(() => {
        if (scaleSize > 0) {
            setXPosition(() => xPosition -= 15);
            setYPosition(() => yPosition += 1);
            setScaleSize(() => scaleSize += 0.003);
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
            />
        </>
    )
}

export default MountainLeft
