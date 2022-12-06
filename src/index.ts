import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import { PixiPlugin } from "gsap/dist/PixiPlugin";
import './styles/global.css';
import {centerIt, drawCircle, drawCurve, drawCursor} from './utils';
import { stateListener } from './stateListener';

PixiPlugin.registerPIXI(PIXI);
gsap.registerPlugin(PixiPlugin);

const RADIUS = 100;
const BOUNDS_RADIUS = 150;
const CATCH_RADIUS = 180;
const CURSOR_RADIUS = 10;

const app = new PIXI.Application({antialias: true, width: 440, height: 440, backgroundColor: 0xFFFFFF});
document.body.appendChild(app.view as any);

const container = new PIXI.Container();
container.hitArea = new PIXI.Rectangle(0, 0, 440, 440);
container.interactive = true;

// сегмент круга. эффект жвачки
const graphicCurve = new PIXI.Graphics();
// анимированный круг
const graphicCircle = new PIXI.Graphics();
// анимированный курсор
const graphicCursor = new PIXI.Graphics();
// внутри начинает притягиваться к курсору
const graphicsHiddenCatchCircle = new PIXI.Graphics();
// внутри двигаем круг вместе с курсором
const graphicsHiddenBoundsCircle = new PIXI.Graphics();
container.addChild(graphicCurve)
container.addChild(graphicCircle)
container.addChild(graphicCursor)
container.addChild(graphicsHiddenCatchCircle)
container.addChild(graphicsHiddenBoundsCircle)

centerIt(graphicCurve, app)
centerIt(graphicCircle, app)
centerIt(graphicCursor, app)
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

const circleProps = {
    centerX: centerXInit,
    centerY: centerYInit,
    radius: RADIUS,
}

const curveProps = {
    anchorX: centerXInit,
    anchorY: centerYInit,
    anchor1X: centerXInit,
    anchor1Y: centerYInit,
    anchor2Y: centerYInit,
    anchor2X: centerXInit,
}

const cursorProps = {
    centerX: centerXInit,
    centerY: centerYInit,
    radius: CURSOR_RADIUS,
}

drawCircle(circleProps, graphicCircle);
drawCursor(cursorProps, graphicCursor);
const stateListenerHandler = stateListener(centerXInit, centerYInit, circleProps, curveProps, cursorProps, RADIUS, BOUNDS_RADIUS, CATCH_RADIUS);

container.on('mousemove', (e: PIXI.FederatedPointerEvent) => {
    let
        pointerX = e.x - offsetX,
        pointerY = e.y - offsetY;

    const pointerInsideMagnitudeBounds = graphicsHiddenCatchCircle.containsPoint({
        x: pointerX,
        y: pointerY
    });

    const pointerInsideCircleBounds = graphicsHiddenBoundsCircle.containsPoint({
        x: pointerX,
        y: pointerY
    });

    let nextState;

    if (pointerInsideMagnitudeBounds) {
        nextState = 'entered';
    }

    if (pointerInsideCircleBounds) {
        nextState = 'inside';
    }

    if (!pointerInsideMagnitudeBounds && !pointerInsideCircleBounds) {
        nextState = 'outside';
    }

    if (nextState) {
        stateListenerHandler(nextState, pointerX, pointerY, e.movement.x, e.movement.y);
    }
})

// main animation loop
app.ticker.add(() => {
    drawCircle(circleProps, graphicCircle);
    drawCurve(curveProps, graphicCurve);
    drawCursor(cursorProps, graphicCursor);
})

