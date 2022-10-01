import React from 'react'
import { Sprite, } from '@inlet/react-pixi';

import mountain_fade from '../../assets/mountain_fade.png';

const MountainFade = ({ mountain_fadeProps }) => {
    const { x, y, scale, anchor } = mountain_fadeProps;

    return (
        <>
            {/* Mountain Fade  */}
            <Sprite
                image={mountain_fade}
                x={x}
                y={y}
                scale={scale}
                anchor={anchor}

            />
        </>
    )
}

export default MountainFade
