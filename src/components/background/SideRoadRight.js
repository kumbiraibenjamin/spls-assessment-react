import React from 'react'
import { useState, useEffect } from 'react';
import { Sprite, } from '@inlet/react-pixi';

import sideroad_right from '../../assets/sideroad_right.png';

const SideRoadRight = ({ sideRRProps }) => {

    let { x, y, scale, anchor } = sideRRProps;

    let [xPosition, setXPosition] = useState(x);
    let [yPosition, setYPosition] = useState(y);
    let [scaleSize, setScaleSize] = useState(scale);


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
                anchor={anchor}

            />
        </>
    )
}

export default SideRoadRight
