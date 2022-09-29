import React from 'react'
import { useState, useEffect } from 'react';
import { Sprite, useTick } from '@inlet/react-pixi';

import sideroad_right from '../../assets/sideroad_right.png';

const SideRoadRight = ({ sideRRProps }) => {

    let { x, y, scale } = sideRRProps;

    let [xPosition, setXPosition] = useState(x);
    let [yPosition, setYPosition] = useState(y);
    let [scaleSize, setScaleSize] = useState(scale);

    useTick(() => {
        if (scaleSize > 0) {
            setXPosition(() => xPosition += 5);
            setYPosition(() => yPosition += 2);
            setScaleSize(() => scaleSize += 0.003);
        }
    });

    useEffect(() => {
        setYPosition(y);
        setXPosition(x);
        setScaleSize(scale);
    }, [sideRRProps]);

    return (
        <>
            <Sprite
                image={sideroad_right}
                x={xPosition}
                y={yPosition}
                scale={scaleSize}
            />
        </>
    )
}

export default SideRoadRight
