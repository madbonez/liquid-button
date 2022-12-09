import {gsap, Power2} from 'gsap';

export const stateListener = (centerXInit: number, centerYInit: number, circleProps: any, curveProps: any, circleRadius: number, boundsRadius: number, catchRadius: number) => {
    let leaveTl;
    let insideTl;
    let lastState = 'outside';
    let centerX = centerXInit;
    let centerY = centerYInit;

    return (newSate: 'outside' | 'inside' | 'entered', pointerX: number, pointerY: number, deltaX: number, deltaY: number) => {


        let pointerAngle = Math.atan2(pointerY - centerY, pointerX - centerX) * 180 / Math.PI;
        pointerAngle = pointerAngle < 0 ? pointerAngle + 360 : pointerAngle
        pointerAngle = pointerAngle * Math.PI / 180

        if (lastState !== 'outside' && newSate === 'outside') {
            centerX = centerXInit;
            centerY = centerYInit;

            let anchor1X = centerX + circleRadius * Math.cos(Math.PI /3 + pointerAngle);
            let anchor1Y = centerY + circleRadius * Math.sin(Math.PI /3 + pointerAngle);
            let anchor2X = centerX + circleRadius * Math.cos(-Math.PI /3 + pointerAngle);
            let anchor2Y = centerY + circleRadius * Math.sin(-Math.PI /3 + pointerAngle);
            let anchorX = centerX;
            let anchorY = centerY;

            leaveTl = gsap.timeline();
            leaveTl
                .add('start')
                .to(curveProps, {
                    anchor1X,
                    anchor1Y,
                    anchor2Y,
                    anchor2X,
                    anchorX,
                    anchorY,
                    delay: 0.3,
                    ease: "power2.in",
                    duration: 0.5
                })
                .to(circleProps, {
                    centerX,
                    centerY,
                    ease: "power2.in",
                    delay: 0.3,
                    duration: 0.5
                }, 'start');


        }

        if (newSate === 'entered') {
            let newX = boundsRadius * Math.cos(pointerAngle) + centerXInit;
            let newY = boundsRadius * Math.sin(pointerAngle) + centerYInit;

            let newCenterX = newX - circleRadius * Math.cos(pointerAngle)
            let newCenterY = newY - circleRadius * Math.sin(pointerAngle)

            centerX = newCenterX;
            centerY = newCenterY;

            let anchor1X = centerX + circleRadius * Math.cos(Math.PI/3 + pointerAngle);
            let anchor1Y = centerY + circleRadius * Math.sin(Math.PI/3 + pointerAngle);
            let anchor2X = centerX + circleRadius * Math.cos(-Math.PI/3 + pointerAngle);
            let anchor2Y = centerY + circleRadius * Math.sin(-Math.PI/3 + pointerAngle);
            let anchorX = 2 * pointerX - centerX;
            let anchorY = 2 * pointerY - centerY;

            gsap.to(circleProps, {
                centerX,
                centerY,
                //    ease: "power2.in",
                duration: 0.5
            })
            gsap.to(curveProps, {
                anchor1X,
                anchor1Y,
                anchor2Y,
                anchor2X,
                anchorX,
                anchorY,
                //      ease: "power2.in",
                duration: 0.5
            })

        }

        if (lastState !== 'inside' && newSate === 'inside') {
            // первый раз отлепить от границы
            centerX = centerX < 200 ? centerX + 1 : centerX - 1;
            centerY = centerY < 200 ? centerY + 1 : centerY - 1;
            let anchor1X = centerX + circleRadius * Math.cos(Math.PI /3 + pointerAngle);
            let anchor1Y = centerY + circleRadius * Math.sin(Math.PI /3 + pointerAngle);
            let anchor2X = centerX + circleRadius * Math.cos(-Math.PI /3 + pointerAngle);
            let anchor2Y = centerY + circleRadius * Math.sin(-Math.PI /3 + pointerAngle);
            let anchorX = centerX;
            let anchorY = centerY;

            insideTl = gsap.timeline()
                .to(circleProps, {
                    centerX,
                    centerY,
                    ease: Power2.easeOut,
                });
            gsap.to(curveProps, {
                anchor1X,
                anchor1Y,
                anchor2Y,
                anchor2X,
                anchorX,
                anchorY,
                ease: Power2.easeOut,
            })
        }

        if (lastState === 'inside' && newSate === 'inside') {
            let newCenterX = centerX + deltaX * (boundsRadius - circleRadius) / boundsRadius
            let newCenterY = centerY + deltaY * (boundsRadius - circleRadius) / boundsRadius
            centerX = newCenterX;
            centerY = newCenterY;

            let anchor1X = centerX + circleRadius * Math.cos(Math.PI /3 + pointerAngle);
            let anchor1Y = centerY + circleRadius * Math.sin(Math.PI /3 + pointerAngle);
            let anchor2X = centerX + circleRadius * Math.cos(-Math.PI /3 + pointerAngle);
            let anchor2Y = centerY + circleRadius * Math.sin(-Math.PI /3 + pointerAngle);
            let distanceBetweenCenterMouse = Math.ceil(Math.sqrt(Math.pow((pointerX - centerXInit), 2) + Math.pow((pointerY - centerYInit), 2)))
            let anchorX
            let anchorY
            if (distanceBetweenCenterMouse > boundsRadius - 20) {
                anchorX = 2 * pointerX - centerX;
                anchorY = 2 * pointerY - centerY;
            } else {
                anchorX = centerX;
                anchorY = centerY;
            }

            gsap.to(circleProps, {
                centerX,
                centerY,
                ease: 'none',
            })
            gsap.to(curveProps, {
                anchor1X,
                anchor1Y,
                anchor2Y,
                anchor2X,
                anchorX,
                anchorY,
                duration: 0.5,
                ease: 'none',
            })
            //  }
        }
        lastState = newSate;
    }
}
