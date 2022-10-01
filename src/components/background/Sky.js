import React from 'react'
import { Sprite, } from '@inlet/react-pixi';

import sky from '../../assets/sky.png';

const Sky = ({ skyProps }) => {
    const { x, y, scale, anchor } = skyProps;

    return (
        <>
            {/* Sky  */}
            <Sprite
                image={sky}
                x={x}
                y={y}
                scale={scale}
                anchor={anchor}

            />
        </>
    )
}

export default Sky
