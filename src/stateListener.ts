import { gsap, Power2 } from 'gsap';

export const stateListener = (centerXInit: number, centerYInit: number, circleProps: any, circleRadius: number, boundsRadius: number, catchRadius: number) => {
    let leaveTl;
    let enterTl;
    let insideTl;
    let lastState = 'outside';
    let centerX = centerXInit;
    let centerY = centerYInit;

    return (newSate: 'outside' | 'inside' | 'entered', pointerX: number, pointerY: number, deltaX: number, deltaY: number) => {

        let pointerAngle = Math.atan2(pointerY - centerY, pointerX - centerX) * 180 / Math.PI;
        pointerAngle = pointerAngle < 0 ? pointerAngle + 360 : pointerAngle
        pointerAngle = pointerAngle * Math.PI /180

        if (lastState !== 'outside' && newSate === 'outside') {
            centerX = centerXInit;
            centerY = centerYInit;

            leaveTl = gsap.timeline();
            leaveTl
                .add('start')
                .to(circleProps, {
                    centerX,
                    centerY,
                    ease: Power2.easeOut,
                    duration: 1
                }, 'start');
        }

        if (newSate === 'entered') {
            // x = radius *  cos(angle)
            // y = radius *  sin(angle)
            //  x= A+r⋅cos(α)
            //  y = B+r⋅sin(α)
            // A = x - r* cos(a)
            // B = y - r* sin(a)
            let newX = boundsRadius * Math.cos(pointerAngle) + centerXInit;
            let newY = boundsRadius * Math.sin(pointerAngle) + centerYInit;

            let newCenterX = newX - circleRadius * Math.cos(pointerAngle)
            let newCenterY = newY - circleRadius * Math.sin(pointerAngle)

            centerX = newCenterX;
            centerY = newCenterY;

            if (lastState !== 'entered') {
                enterTl = gsap.timeline();
                enterTl
                    .add('start')
                    .to(circleProps, {
                        centerX,
                        centerY,
                        // ease: Power2.easeInOut,
                        // duration: 0.5
                    }, 'start');
            } else {
                gsap.to(circleProps, {
                    centerX,
                    centerY,
                })
            }
        }

        if (lastState !== 'inside' && newSate === 'inside') {
            // первый раз отлепить от границы
            centerX = centerX < 200 ? centerX + 1 : centerX - 1;
            centerY = centerY < 200 ? centerY + 1 : centerY - 1;
            insideTl = gsap.timeline()
                .to(circleProps, {
                    centerX,
                    centerY,
                });
        }

        if (lastState === 'inside' && newSate === 'inside') {
            let newCenterX = centerX + deltaX * 0.5
            let newCenterY = centerY + deltaY * 0.5

            let distanceBetweenCenters = Math.ceil(Math.sqrt(Math.pow((newCenterX - centerXInit), 2) + Math.pow((newCenterY - centerYInit), 2)))
            console.log(distanceBetweenCenters, boundsRadius - circleRadius)
            if ((boundsRadius - circleRadius) > distanceBetweenCenters) {
                centerX = newCenterX;
                centerY = newCenterY;

                gsap.timeline()
                    .to(circleProps, {
                        centerX,
                        centerY,
                    })
            }
        }

        lastState = newSate;
    }
}
