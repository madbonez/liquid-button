import { gsap, Power2 } from 'gsap';
import * as PIXI from 'pixi.js';

export const stateListener = (centerXInit: number, centerYInit: number, circleProps: any, circleRadius: number, boundsRadius: number, catchRadius: number, SIZE: number, graphicsText, textContainer: PIXI.Container) => {
    let lastState = 'outside';
    let circleCenterTl = gsap.timeline({ease: 'none'});
    let textContainerTl = gsap.timeline({ease: 'none'});
    let textTl = gsap.timeline({ease: 'none'});

    let centerX = centerXInit;
    let centerY = centerYInit;

    let textTlComplete;

    return (newSate: 'outside' | 'inside' | 'entered', pointerX: number, pointerY: number, deltaX: number, deltaY: number) => {

        if (lastState !== 'inside' && newSate === 'inside') {
            let newCenterX = (boundsRadius - circleRadius) * (pointerX - SIZE / 2) / boundsRadius + SIZE / 2;
            let newCenterY = (boundsRadius - circleRadius) * (pointerY - SIZE / 2) / boundsRadius + SIZE / 2;

            centerX = newCenterX;
            centerY = newCenterY;

            gsap.to(circleProps, {
                centerX,
                centerY,
                duration: 0.1,
            })

            gsap
                .set(textContainer, {
                    x: centerX - graphicsText.width / 2,
                    y: centerY - graphicsText.height / 2,
                });

            textTl
                .fromTo(graphicsText, {
                        delay: 0.1,
                        duration: 0.3,
                        alpha: 1,
                    }, {
                        delay: 0.1,
                        duration: 0.3,
                        alpha: 0,
                        y: '0',
                    }
                )
                .fromTo(graphicsText,
                    {
                        alpha: 0,
                        duration: 0.3,
                        y: '140',
                    },
                    {
                        alpha: 1,
                        duration: 0.3,
                        y: '70',
                    }
                )
        }

        if (lastState === 'inside' && newSate === 'inside') {
            let newCenterX = (boundsRadius - circleRadius) * (pointerX - SIZE / 2) / boundsRadius + SIZE / 2
            let newCenterY = (boundsRadius - circleRadius) * (pointerY - SIZE / 2) / boundsRadius + SIZE / 2
            let inDuration = (centerX - newCenterX > 5 || centerY - newCenterY > 5) ? 0.3 : 0

            centerX = newCenterX;
            centerY = newCenterY;

            gsap
                .to(circleProps, {
                    centerX,
                    centerY,
                    duration: inDuration,
                })

            gsap
                .set(textContainer, {
                        x: centerX - graphicsText.width / 2,
                        y: centerY - graphicsText.height / 2,
                    }
                )
        }

        if (lastState !== 'outside' && newSate === 'outside') {
            centerX = centerXInit;
            centerY = centerYInit;

            gsap
                .to(circleProps, {
                    centerX,
                    centerY,
                    ease: 'back.out(1.7)',
                })

            gsap
                .to(textContainer, {
                        x: centerX - graphicsText.width / 2,
                        y: centerY - graphicsText.height / 2,
                        ease: 'back.out(1.7)',
                    }
                );
        }

        lastState = newSate;
    }
}
