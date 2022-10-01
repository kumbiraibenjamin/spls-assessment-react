import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { Container, useTick, Graphics, withFilters } from '@inlet/react-pixi';

import SideRoadLeft from './SideRoadLeft';
import SideRoadRight from './SideRoadRight';
import MountainLeft from './MountainLeft';
import MountainRight from './MountainRight';
import Sky from './Sky';
import Road from './Road';
import MountainFade from './MountainFade';

import * as PIXI from 'pixi.js';

let i = 0;
let sideLScaler = 0;
let sideLXPosition = 0;

let sideRScaler = 0;
let sideRXPosition = 0;

let mountainLTimer = 0;
let mountainRTimer = 0;

// Stage max-height set to 649 and max-width set to 1120

const Background = ({ width, height, collision }) => {

    const Filters = withFilters(Container, {
        blur: PIXI.filters.BlurFilter,
    });


    // Set stage items to scale 0 until width is set then update
    const [roadProps, setRoadProps] = useState({ x: 0, y: 0, scale: 0, anchor: 0.5 });
    const [skyProps, setSkyProps] = useState({ x: 0, y: 0, scale: 0, anchor: 0.5 });
    const [mountain_fadeProps, setMountain_fadeProps] = useState({ x: 0, y: 0, scale: 0, anchor: 0.5 });
    const [count, setCount] = useState(0);

    // Setdefault values for right container
    const [sideRRProps, setSideRRProps] = useState({ x: 1000, y: 1000, scale: 1, anchor: 0.5 });
    const [mountainRProps, setMountainRProps] = useState({ x: -200, y: 0, scale: 1, anchor: 0.5 });
    const [rightContainer, setRightContainer] = useState({ position: [width / 2, height / 2], width: width, anchor: 0.5, scale: 0.2 });

    // setdefault values for left container
    const [sideRLProps, setSideRLProps] = useState({ x: -1000, y: 1000, scale: 1, anchor: 0.5 });
    const [mountainLProps, setMountainLProps] = useState({ x: 200, y: 0, scale: 1, anchor: 0.5 });
    const [leftContainer, setLeftContainer] = useState({ position: [width / 2, height / 2], anchor: 0.5, scale: 0 });


    useTick((delta) => {

        i++;
        setCount(i * 10);
        if (i > 150) i = 0;

        sideLScaler += 0.001 * delta;
        sideLXPosition += 2;
        setLeftContainer({ position: [width * 0.38 - sideLXPosition, height * 0.6], anchor: 0.5, scale: sideLScaler });
        if (sideLScaler >= 0.5) {
            sideLScaler = 0;
            sideLXPosition = 0;
        }

        sideRScaler += 0.001 * delta;
        sideRXPosition += 2;
        setRightContainer({ position: [width * 0.55 + sideRXPosition, height * 0.6], anchor: 0.5, scale: sideRScaler });
        if (sideRScaler >= 0.5) {
            sideRScaler = 0;
            sideRXPosition = 0;
        }


    });

    useEffect(() => {

        setRoadProps({ x: 0, y: height * 0.339, scale: width / 4148, anchor: 0.5 });
        setSkyProps({ x: 0, y: 0, scale: width / 4019, anchor: 0.5 });
        setMountain_fadeProps({ x: 0, y: height * 0.0385, scale: width / 3034, anchor: 0.5 });

    }, [width, height]);

    const roadShadow = useCallback((g) => {

        g.clear();
        g.beginFill(0xffd900, 0.1)

        g.moveTo(width * 0.089, height * 0.46 + count);
        g.lineTo(width, height * 0.63 + count);
        g.lineTo(width, height * 0.77 + count);
        g.lineTo(width * 0.089, height * 0.63 + count);


        g.closePath();
    }, [count, width, height]);

    const mist = useCallback((g) => {
        const ht = height / 2 + height * 0.077;
        const hb = ht + height * 0.05;
        const hm = (hb + ht) / 2;
        const w75 = width * 0.75;
        const w25 = width * 0.25;

        g.clear();
        g.beginFill(0xffffff, 0.7)

        g.moveTo(0, hm);
        g.lineTo(w25, ht);
        g.lineTo(w75, ht);
        g.lineTo(width, hm);
        g.lineTo(w75, hb);
        g.lineTo(w25, hb);

        g.closePath();

        // g.drawRect(width * 0.25, height / 2 + 50, width * 0.5, height * 0.05)


    }, [width, height]);

    return (

        <>
            <Container position={[width / 2, height / 2]}>
                {/* Sky */}
                <Sky skyProps={skyProps} />

                {/* Mountain Fade */}
                <MountainFade mountain_fadeProps={mountain_fadeProps} />

                {/* Road  */}
                <Road roadProps={roadProps} />
            </ Container>

            <Graphics draw={roadShadow} anchor={0.5} rotation={0.1} />
            <Filters blur={{ blur: 7 }}>
                <Graphics draw={mist} anchor={0.5} />
            </Filters>

            {collision ? <></> : <>
                <Container {...leftContainer}>
                    <MountainLeft mountainLProps={mountainLProps} />
                    <SideRoadLeft sideRLProps={sideRLProps} />
                </Container>

                <Container {...rightContainer}>
                    <SideRoadRight sideRRProps={sideRRProps} />
                    <MountainRight mountainRProps={mountainRProps} />
                </Container>
            </>}

        </>
    )
}

export default Background
