import React, { useEffect, useState } from 'react'
import { Sprite, useTick } from '@inlet/react-pixi'


const EnemyCar = ({ enemyProps, carProps, handleCollision, width, height }) => {
    let { x, y, image, scale, position } = enemyProps;
    const playerX = carProps.x;
    const playerY = carProps.y;
    const playerPositionVal = carProps.position;

    let [xPosition, setXPosition] = useState(x);
    let [yPosition, setYPosition] = useState(y);

    let [playerXPos, setPlayerXPos] = useState(playerX);
    let [playerYPos, setPlayerYPos] = useState(playerY);
    let [playerPosition, setPlayerPosition] = useState(playerPositionVal);

    let [scaleSize, setScaleSize] = useState(scale);
    let [enemyPosition, setEnemyPosition] = useState(position);
    let [imageDir, setImageDir] = useState(image);

    useTick((delta) => {

        if (scaleSize > 0) {

            if (enemyPosition === 'center') {
                setXPosition(() => xPosition -= 1);
            } else if (enemyPosition === 'left') {
                setXPosition(() => xPosition -= 8);

            } else if (enemyPosition === 'right') {
                setXPosition(() => xPosition += 5);

            }
            setYPosition(() => yPosition += delta * 2);
            setScaleSize(() => scaleSize += 0.0093 * delta);

            if (yPosition < height) {

                if (playerPosition === enemyPosition && Math.abs(yPosition - (playerYPos * 0.6)) < 10) {
                    handleCollision();
                }
            }


        }
    });

    useEffect(() => {
        setYPosition(y);
        setXPosition(x);

        setImageDir(image);
        setScaleSize(scale);
        setEnemyPosition(position);

    }, [enemyProps, width, height,]);

    useEffect(() => {


        setPlayerYPos(playerY);
        setPlayerXPos(playerX);
        setPlayerPosition(playerPositionVal);


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
