import React from 'react'
import { useState, useEffect } from 'react';
import { Sprite } from '@inlet/react-pixi';

import sideroad_left from '../../assets/sideroad_left.png';

const SideRoadLeft = ({ sideRLProps }) => {

    let { x, y, scale, anchor } = sideRLProps;

    let [xPosition, setXPosition] = useState(x);
    let [yPosition, setYPosition] = useState(y);
    let [scaleSize, setScaleSize] = useState(scale);

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
                anchor={anchor}
            />
        </>
    )
}

export default SideRoadLeft
