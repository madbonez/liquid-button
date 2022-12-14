import {gsap, Power2} from 'gsap';

export const stateListener = (centerXInit: number, centerYInit: number, circleProps: any, circleRadius: number, boundsRadius: number, catchRadius: number, SIZE: number, graphicsText) => {
    let leaveTl;
    let insideTl;
    let lastState = 'outside';
    let centerX = centerXInit;
    let centerY = centerYInit;
    let textAnimation = false;
    let outsideAnimation = false;
    insideTl = gsap.timeline({ease: 'none'})
    return (newSate: 'outside' | 'inside' | 'entered', pointerX: number, pointerY: number, deltaX: number, deltaY: number) => {

console.log(graphicsText)
        if (lastState !== 'outside' && newSate === 'outside' && !textAnimation && !outsideAnimation) {
            outsideAnimation = true;
            centerX = centerXInit;
            centerY = centerYInit;
            leaveTl = gsap.timeline({
                duration: 0.3
            });

                insideTl
                    .add('start')
                    .to(circleProps, {
                        centerX,
                        centerY,
                        ease: 'back.out(1.7)',
                    }, 'start')
                    .to(graphicsText, {
                            x: centerX - graphicsText.width / 2,
                            y: centerY - graphicsText.height / 2,
                            ease: 'back.out(1.7)',
                            onComplite: () => {
                                outsideAnimation = false
                            }
                        }, '<'
                    );




        }



        if (lastState !== 'inside' && newSate === 'inside' && !textAnimation && !outsideAnimation) {
            textAnimation = true;
                let newCenterX = (boundsRadius - circleRadius) * (pointerX - SIZE / 2) / boundsRadius + SIZE / 2
                let newCenterY = (boundsRadius - circleRadius) * (pointerY - SIZE / 2) / boundsRadius + SIZE / 2
                centerX = newCenterX;
                centerY = newCenterY;
         //   insideTl = gsap.timeline({ease: 'none'})
                insideTl.to(circleProps, {
                    centerX,
                    centerY,
                    duration: 0.1,
                }).to(graphicsText, {
                        x: centerX - graphicsText.width / 2,
                        y: centerY - graphicsText.height / 2,
                        duration: 0.1,
                        alpha: 1,
                    }, '<'
                ).to(graphicsText, {
                        delay: 0.1,
                        duration: 0.3,
                        alpha: 0,
                        y: centerY - graphicsText.height / 2 - 70,
                    }
                ).fromTo(graphicsText, {
                        y: centerY - graphicsText.height / 2 + 70,
                        alpha: 0,
                    }, {
                        alpha: 1,
                        duration: 0.3,
                        y: centerY - graphicsText.height / 2,
                        onComplete: () => {
                            textAnimation = false
                        }
                    }
                )

        }

        if (lastState === 'inside' && newSate === 'inside' && !textAnimation && !outsideAnimation) {
            let newCenterX = (boundsRadius - circleRadius) * (pointerX - SIZE / 2) / boundsRadius + SIZE / 2
            let newCenterY = (boundsRadius - circleRadius) * (pointerY - SIZE / 2) / boundsRadius + SIZE / 2
            let inDuration = (centerX - newCenterX > 5 || centerY - newCenterY > 5) ? 0.3 : 0
            centerX = newCenterX;
            centerY = newCenterY;
            insideTl
                .to(circleProps, {
                    centerX,
                    centerY,
                    duration: inDuration,
                }).to(graphicsText, {
                    x: centerX - graphicsText.width / 2,
                    y: centerY - graphicsText.height / 2,
                    duration: inDuration,
                }, '<'
            )
            //  }
        }
        lastState = newSate;
    }
}
