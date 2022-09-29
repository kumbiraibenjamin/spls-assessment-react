import React from 'react';
import { useState, useEffect } from 'react';
import { Sprite } from '@inlet/react-pixi';

import SideRoadLeft from './SideRoadLeft';
import SideRoadRight from './SideRoadRight';
import MountainLeft from './MountainLeft';
import MountainRight from './MountainRight';

// Sprite Images
import road from '../../assets/road.png';
import sky from '../../assets/sky.png';
import mountain_fade from '../../assets/mountain_fade.png';

let i = 0;

const Background = ({ x, y, collision }) => {
    const roadProps = { scale: 0.125 }
    const skyProps = { scale: 0.20 }
    const mFadeProps = { scale: 0.26, y: y - 180 }


    const [sideRLProps, setSideRLProps] = useState({ x: 0, y: 0, scale: 0 });
    const [sideRRProps, setSideRRProps] = useState({ x: 0, y: 0, scale: 0 });

    const [mountainLProps, setMountainLProps] = useState({ x: 0, y: 0, scale: 0 });
    const [mountainRProps, setMountainRProps] = useState({ x: 0, y: 0, scale: 0 });


    useEffect(() => {
        setInterval(() => {
            setSideRLProps({ x: 300, y: 460, scale: 0.01 })
        }, 2000);

        setInterval(() => {
            setSideRRProps({ x: 450, y: 460, scale: 0.05 })
        }, 3000);

        setInterval(() => {
            setMountainLProps({ x: 300, y: 460, scale: 0.01 })
        }, 5000);

        setInterval(() => {
            setMountainRProps({ x: 450, y: 460, scale: 0.02 })
        }, 1000);
    }, [])

    return (
        <>
            {/* Sky  */}
            <Sprite
                image={sky}
                x={0}
                y={0}
                {...skyProps}
            />

            {/* Mountain Fade */}
            <Sprite
                image={mountain_fade}
                x={0}
                y={y * 0.55}
                {...mFadeProps}
            />

            {/* Road  */}
            <Sprite
                image={road}
                x={0}
                y={y - 140}
                {...roadProps}
            />
            {
                collision ? <></> :
                    <>
                        <SideRoadLeft sideRLProps={sideRLProps} />
                        <SideRoadRight sideRRProps={sideRRProps} />
                        <MountainLeft mountainLProps={mountainLProps} />
                        <MountainRight mountainRProps={mountainRProps} />
                    </>
            }

        </>
    )
}

export default Background
