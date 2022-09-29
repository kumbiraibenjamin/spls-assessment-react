import React, { useEffect, useState } from 'react'
import { Sprite, useTick } from '@inlet/react-pixi'


const xIncrement = (position, xPosition, xInc) => {
    if (position === 'center') {
        return xPosition;
    } else if (position === 'left') {
        return xPosition - xInc;
    } else if (position === 'right') {
        return xPosition + xInc;
    }
};

const EnemyCar = ({ carProps, playerPosition, handleCollision }) => {
    let { x, y, image, scale, position } = carProps;

    let [xPosition, setXPosition] = useState(x);
    let [yPosition, setYPosition] = useState(y);
    let [scaleSize, setScaleSize] = useState(scale);
    let [imageDir, setImageDir] = useState(image);

    useTick(() => {
        setXPosition(xIncrement(position, xPosition, 2));
        setYPosition(() => yPosition += 1);
        setScaleSize(() => scaleSize += 0.003);

        const { x, y } = playerPosition;

        if (Math.abs(y - yPosition) < 20 && Math.abs(x - xPosition) < 20) {
            handleCollision();
        }

    });

    useEffect(() => {
        setYPosition(y);
        setXPosition(x);
        setImageDir(image);
        setScaleSize(scale);
    }, [carProps]);


    return (
        <Sprite
            image={imageDir}
            x={xPosition}
            y={yPosition}
            scale={scaleSize}
        />
    )
}

export default EnemyCar
