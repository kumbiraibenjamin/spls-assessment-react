import React from 'react'
import { Sprite, } from '@inlet/react-pixi';

import road from '../../assets/road.png';

const Road = ({ roadProps }) => {
    const { x, y, scale, anchor } = roadProps;

    return (
        <>
            {/* Road  */}
            <Sprite
                image={road}
                x={x}
                y={y}
                scale={scale}
                anchor={anchor}
            // rotation={0.08}
            />
        </>
    )
}

export default Road
