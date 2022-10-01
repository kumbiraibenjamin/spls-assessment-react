import { AnimatedSprite, Container } from '@inlet/react-pixi'
import { useEffect, useState, } from 'react';


const Explosion = ({ carProps, width, height, textures }) => {
    const { x, y } = carProps;


    const [explosionXPosition, setExplosionXPosition] = useState(x);
    const [explosionYPosition, setExplosionYPosition] = useState(y);

    const [explosionTextures, setExplosionTextures] = useState(textures);

    // const [explosionWidth, setExplosionWidth] = useState(200);
    // const [explosionHeight, setExplosionHeight] = useState(200);




    useEffect(() => {
        setExplosionXPosition(x);
        setExplosionYPosition(y);

        setExplosionTextures(textures);

    }, [carProps, textures, width, height, x, y]);

    return (

        <Container position={[explosionXPosition, explosionYPosition - height / 2]} width={width / 2}
            height={height / 2}>
            <AnimatedSprite
                anchor={0.5}
                textures={explosionTextures}
                isPlaying={true}
                // initialFrame={0}
                scale={0.5}
                animationSpeed={0.1}
            />
        </Container>



    )
}

export default Explosion
