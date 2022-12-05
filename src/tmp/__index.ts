import * as PIXI from 'pixi.js';
import { gsap, Linear, Bounce, Cubic, Power2 } from 'gsap';
import { PixiPlugin } from "gsap/dist/PixiPlugin";
import '../styles/global.css';
import { centerIt, drawCircle } from '../utils';
import { createStateMachine, MachineState } from './createStateMachine';

PixiPlugin.registerPIXI(PIXI);
gsap.registerPlugin(PixiPlugin);

const RAD = Math.PI / 180;
const RADIUS = 100;
const BOUNDS_RADIUS = 150;
const CATCH_RADIUS = 200;

const app = new PIXI.Application({antialias: true, width: 440, height: 440, backgroundColor: 0xFFFFFF});
document.body.appendChild(app.view as any);

const container = new PIXI.Container();
container.hitArea = new PIXI.Rectangle(0, 0, 400, 400);
container.interactive = true;

// сегмент круга. эффект жвачки
const graphicCurve = new PIXI.Graphics();
// анимированный круг
const graphicCircle = new PIXI.Graphics();
// внутри начинает притягиваться к курсору
const graphicsHiddenCatchCircle = new PIXI.Graphics();
// внутри двигаем круг вместе с курсором
const graphicsHiddenBoundsCircle = new PIXI.Graphics();
container.addChild(graphicCurve)
container.addChild(graphicCircle)
container.addChild(graphicsHiddenCatchCircle)
container.addChild(graphicsHiddenBoundsCircle)

centerIt(graphicCurve, app)
centerIt(graphicCircle, app)
centerIt(graphicsHiddenCatchCircle, app)
centerIt(graphicsHiddenBoundsCircle, app)

const centerXInit = app.screen.width / 2,
    centerYInit = app.screen.height / 2;

const
    offsetX = app.view.getBoundingClientRect().x,
    offsetY = app.view.getBoundingClientRect().y;

const
    // смещение крайних точек сегмента от горизонта
    degreeOffset = 30,
    circleLeft = 180,
    circleRight = 0;
    // anchor1XInit = centerXInit + RADIUS * Math.cos((circleLeft + degreeOffset) * RAD),
    // anchor1YInit = centerYInit + RADIUS * Math.sin((circleLeft + degreeOffset) * RAD),
    // anchor2XInit = centerXInit + RADIUS * Math.cos((circleRight - degreeOffset) * RAD),
    // anchor2YInit = centerYInit + RADIUS * Math.sin((circleRight - degreeOffset) * RAD),
    // anchorMiddleXInit = app.screen.width / 2,
    // anchorMiddleYInit = app.screen.height / 2;

let
    anchor1X,
    anchor1Y,
    anchor2X,
    anchor2Y,
    anchorMiddleX,
    anchorMiddleY,
    centerX,
    centerY;

graphicsHiddenCatchCircle.beginFill(0, 0.101);
graphicsHiddenCatchCircle.drawCircle(centerXInit, centerYInit, CATCH_RADIUS);
graphicsHiddenCatchCircle.endFill();

graphicsHiddenBoundsCircle.beginFill(0, 0.101);
graphicsHiddenBoundsCircle.drawCircle(centerXInit, centerYInit, BOUNDS_RADIUS);
graphicsHiddenBoundsCircle.endFill();

app.stage.addChild(container);

// const curveProps = {
//     anchor1X: anchor1XInit,
//     anchor1Y: anchor1YInit,
//     anchor2X: anchor2XInit,
//     anchor2Y: anchor2YInit,
//     anchorMiddleX: anchorMiddleXInit,
//     anchorMiddleY: anchorMiddleYInit,
// }

const circleProps = {
    centerX: centerXInit,
    centerY: centerYInit,
    radius: RADIUS,
}

drawCircle(circleProps, graphicCircle);

let leaveTl;
let enterTl = gsap.timeline();
const newStateListener = (newSate: MachineState) => {
    console.log(newSate);

    if (newSate === 'LEAVE') {
        leaveTl = gsap.timeline();
        leaveTl
            .add('start')
            .to(circleProps, {
                centerX: centerXInit,
                centerY: centerYInit,
                radius: RADIUS,
                ease: Power2.easeOut,
                duration: 2
            }, 'start')
            // .to(curveProps, {
            //     anchor1X: anchor1XInit,
            //     anchor1Y: anchor1YInit,
            //     anchor2X: anchor2XInit,
            //     anchor2Y: anchor2YInit,
            //     anchorMiddleX: anchorMiddleXInit,
            //     anchorMiddleY: anchorMiddleYInit,
            //     ease: Power2.easeOut,
            //     duration: 2
            // }, 'start')

        leaveTl.eventCallback('onComplete', () => machine.dispatch('idle'));
    }

    if (newSate === 'ENTER') {
        if (leaveTl?.isActive()) {
            leaveTl.kill();
        }

        enterTl = gsap.timeline();
        enterTl
            .add('start')
            .to(circleProps, {
                centerX,
                centerY,
                radius: RADIUS,
                ease: Power2.easeInOut,
                duration: 1
            }, 'start')
            // .to(curveProps, {
            //     anchor1X,
            //     anchor1Y,
            //     anchor2X,
            //     anchor2Y,
            //     anchorMiddleX,
            //     anchorMiddleY,
            //     ease: Power2.easeInOut,
            //     duration: 1
            // }, 'start')
    }
}
const machine = createStateMachine(newStateListener)

let lastCircleTween;
let lastCurveTween;
let lastBoundsState;
container.on('mousemove', (e: PIXI.FederatedPointerEvent) => {
    let
        pointerX = e.x - offsetX,
        pointerY = e.y - offsetY;

    let pointerInsideCircle = graphicCircle.containsPoint({
        x: pointerX,
        y: pointerY
    });

    let radiusMoveCircle = app.screen.width / 2 - RADIUS / 2;

    centerX =
        !pointerInsideCircle
            ? (pointerX > radiusMoveCircle && pointerX < app.screen.width - radiusMoveCircle)
                ? pointerX
                : pointerX < radiusMoveCircle
                    ? radiusMoveCircle
                    : app.screen.width - radiusMoveCircle
            : centerX + e.movement.x;

    centerY =
        !pointerInsideCircle
            ? (pointerY > radiusMoveCircle && pointerY < app.screen.height - radiusMoveCircle)
                ? pointerY
                : pointerY < radiusMoveCircle
                    ? radiusMoveCircle
                    : app.screen.height - radiusMoveCircle
            : centerY + e.movement.y;

    // угол между центром квадрата и лучом от указателя мыши к центру
    let
        pointerAngle = Math.atan2(pointerY - centerY, pointerX - centerX) * 180 / Math.PI + 90;
    anchor1X = centerX + RADIUS * Math.cos((circleLeft + degreeOffset + pointerAngle) * RAD);
    anchor1Y = centerY + RADIUS * Math.sin((circleLeft + degreeOffset + pointerAngle) * RAD);
    anchor2X = centerX + RADIUS * Math.cos((circleRight - degreeOffset + pointerAngle) * RAD);
    anchor2Y = centerY + RADIUS * Math.sin((circleRight - degreeOffset + pointerAngle) * RAD);
    anchorMiddleX = 2 * pointerX - centerX;
    anchorMiddleY = 2 * pointerY - centerY;

    const pointerInsideHiddenBounds = graphicsHiddenCatchCircle.containsPoint({
        x: pointerX,
        y: pointerY
    });

    const pointerInsideCircleBounds = graphicCircle.containsPoint({
        x: pointerX,
        y: pointerY
    });

    if (pointerInsideCircleBounds) {
        machine.dispatch('inside');
    }

    if (pointerInsideHiddenBounds && (!lastBoundsState || lastBoundsState === 'leave')) {
        machine.dispatch('enter');
        lastBoundsState = 'enter';
    }

    if (!pointerInsideHiddenBounds && lastBoundsState === 'enter') {
        machine.dispatch('leave');
        lastBoundsState = 'leave';
    }

    if (machine.state === 'INSIDE') {
        enterTl.reverse()

        if (centerX < centerXInit) {
            // lastCurveTween = gsap.to(curveProps, {
            //     anchor1X: anchor1X * 1.5,
            //     anchor2X: anchor2X * 1.5,
            //     anchor1Y,
            //     anchor2Y,
            //     anchorMiddleX,
            //     anchorMiddleY,
            // })
            lastCircleTween = gsap.to(circleProps, {
                centerX: centerX * 1.5,
                centerY,
                radius: RADIUS,
            })
        }

        if (centerX > centerXInit) {
            // lastCurveTween = gsap.to(curveProps, {
            //     anchor1X: anchor1X * 0.5,
            //     anchor2X: anchor2X * 0.5,
            //     anchor1Y,
            //     anchor2Y,
            //     anchorMiddleX,
            //     anchorMiddleY,
            // })
            lastCircleTween = gsap.to(circleProps, {
                centerX: centerX * 0.5,
                centerY,
                radius: RADIUS,
            })
        }
    }

})

// main animation loop
app.ticker.add(() => {
    graphicCurve.clear();
    graphicCurve.beginFill(0xAA4F08, 1);
    // graphicCurve.moveTo(curveProps.anchor1X, curveProps.anchor1Y)
    // graphicCurve.quadraticCurveTo(curveProps.anchorMiddleX, curveProps.anchorMiddleY, curveProps.anchor2X, curveProps.anchor2Y)
    graphicCurve.endFill();

    drawCircle(circleProps, graphicCircle);
})

