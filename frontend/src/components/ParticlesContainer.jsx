import {Particles} from 'react-tsparticles';
import {loadFull} from 'tsparticles'
import React, {useCallback} from 'react'

const ParticlesContainer = () =>{
    //init
    const particlesInit = useCallback(async(engine) => {
        await loadFull(engine);
    },[]);

    const particlesLoaded = useCallback(async()=>{
        console.log("Particles loaded:", container);
    },[]);

    return(
        <Particles className='w-screen min-h-screen absolute particles-container' id='tsparticles' init={particlesInit} loaded={particlesLoaded} 
        options={{
            fullscreen : {enable:false},
            background : {
                color:{
                    value: '',
                },
            },
            fpsLimit: 120,
            interactivity: {
                events: {
                    onClick: {
                        enable : false,
                        mode: 'push',
                    },
                    onHover :{
                        enable : true,
                        mode : 'repulse',
                    },
                    resize: true,
                },
                modes:{
                    push:{
                        quantity : 90
                    },
                    repulse:{
                        distance : 100,
                        duration : 0.4,
                    }
                }
            },
            particles:{
                color:{
                    value :'#ffb280', 
                },
                links :{
                    color : '#ff9d5c',
                    distance : 200,
                    enable : false,
                    opacity : 1,
                    width : 1
                },
                collisions:{
                    enable: true,
                },
                move: {
                    directions: 'bottom',
                    enable : true,
                    outModes:{
                        default : 'out'
                    },
                    random : false,
                    speed : 0.7,
                    straight : false,
                },
                number :{
                    density : {
                        enable: true,
                        area : 800,
                    },
                    value: 120
                },
                opacity : {
                    value : 0.5,
                },
                shape : {
                    type : 'circle'
                },
                size:{
                    value : {min: 1, max:5},
                },
            },
            detectRetina: true,
        }}
        />
    );
}

export default ParticlesContainer;
