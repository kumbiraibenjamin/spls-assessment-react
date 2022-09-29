import React from 'react'
import { useState, useEffect } from 'react';
import { Sprite, useTick } from '@inlet/react-pixi';

import sideroad_left from '../../assets/sideroad_left.png';

const SideRoadLeft = ({ sideRLProps }) => {

    let { x, y, scale } = sideRLProps;

    let [xPosition, setXPosition] = useState(x);
    let [yPosition, setYPosition] = useState(y);
    let [scaleSize, setScaleSize] = useState(scale);

    useTick(() => {
        if (scaleSize > 0) {
            setXPosition(() => xPosition -= 15);
            setYPosition(() => yPosition += 2);
            setScaleSize(() => scaleSize += 0.003);
        }

    });

    useEffect(() => {
        setYPosition(y);
        setXPosition(x);
        setScaleSize(scale);
    }, [sideRLProps]);

    return (
        <>
            <Sprite
                image={sideroad_left}
                x={xPosition}
                y={yPosition}
                scale={scaleSize}
            />
        </>
    )
}

export default SideRoadLeft
