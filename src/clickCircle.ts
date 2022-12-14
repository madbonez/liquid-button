import {gsap, Power2} from 'gsap';

export const clickCircle = (centerXInit: number, centerYInit: number, circleProps: any, circleRadius: number, boundsRadius: number, catchRadius: number, SIZE: number, graphicsText) => {


    return () => {
        gsap.timeline()
            .to(circleProps, {
            radius: circleRadius*0.7,
            duration: 0.3,
        })  .to(circleProps, {
            delay: 3,
            radius: circleRadius,
            duration: 0.8,
        })

    }
}
