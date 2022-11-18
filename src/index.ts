import * as PIXI from 'pixi.js';
import { gsap, Back, Linear } from 'gsap';
import { PixiPlugin } from "gsap/dist/PixiPlugin";
import './styles/global.css';

PixiPlugin.registerPIXI(PIXI);
gsap.registerPlugin(PixiPlugin);

const RAD = Math.PI / 180;
const RADIUS = 100;

function centerIt(graphics) {
    graphics.position.x = app.screen.width / 2;
    graphics.position.y = app.screen.height / 2;
    graphics.pivot.x = app.screen.width / 2;
    graphics.pivot.y = app.screen.height / 2;
}

const app = new PIXI.Application({antialias: true, width: 400, height: 400, backgroundColor: 0xFFFFFF});
document.body.appendChild(app.view as any);

const container = new PIXI.Container();
container.hitArea = new PIXI.Rectangle(0, 0, 400, 400);
container.interactive = true;
container.on('mousemove', (e: PIXI.FederatedPointerEvent) => {
    // точка на окружности
    // x=x0+r⋅cos δ
    // y=y0+r⋅sin δ
    // вроде как длина мд двух точек на окружности
    // 2R * sin(a / 2)

    let
        offsetX = app.view.getBoundingClientRect().x,
        offsetY = app.view.getBoundingClientRect().y,
        pointerX = e.x - offsetX,
        pointerY = e.y - offsetY,
        centerX = app.screen.width / 2,
        centerY = app.screen.height / 2,
        // угол между центром квадрата и лучом от указателя мыши к центру
        pointerAngle = Math.atan2(pointerY - centerY, pointerX - centerX) * 180 / Math.PI,
        // насколько сместиться по окружности точкам
        degreeOffset = 10,
        circleLeft = 180,
        circleRight = 0,
        circleMiddle = 270,
        anchor1X = centerX + RADIUS * Math.cos((circleLeft + degreeOffset) * RAD),
        anchor1Y = centerY + RADIUS * Math.sin((circleLeft + degreeOffset) * RAD),
        anchor2X = centerX + RADIUS * Math.cos((circleRight - degreeOffset) * RAD),
        anchor2Y = centerY + RADIUS * Math.sin((circleRight - degreeOffset) * RAD)
        // curveBottomL = 2 * RADIUS * Math.sin((circleLeft - 2 * Math.abs(degreeOffset)) / 2 * RAD)
    ;


    graphicCurve.clear();
    graphicCurve.beginFill(0xAA4F08, 1);
    graphicCurve.moveTo(anchor1X, anchor1Y)
    // xz
    const middleYPoint = centerY - RADIUS * Math.sin(circleMiddle * RAD);
    graphicCurve.quadraticCurveTo(anchor2X / 2, middleYPoint, anchor2X, anchor2Y)
    graphicCurve.endFill();
})


const graphicCurve = new PIXI.Graphics();
const graphicCircle = new PIXI.Graphics();
container.addChild(graphicCurve)
container.addChild(graphicCircle)

centerIt(graphicCurve)
centerIt(graphicCircle)


graphicCircle.beginFill(0xAA4F08, 0.7);
graphicCircle.drawEllipse(200, 200, RADIUS, RADIUS);
graphicCircle.endFill();

app.stage.addChild(container);

const arc = {
    x: 200,
    y: 250,
    radius: 60,
    angle: 180
};

// graphicsCurved
//     .clear()
//     .beginFill(0xAA4F08, 0.2)
//     .arc(arc.x, arc.y, arc.radius, 0, arc.angle * RAD)
//     .endFill();

gsap.set(graphicCircle, {
    pixi: {
        // fillColor: 'blue'
    }
})


document.body.addEventListener('mousemove', (e) => {
    gsap.to(graphicCurve,
        {
            pixi: {
                // x: e.x,
                // y: e.y
            }
            // , duration: 5, ease: Back.easeOut.config(3)
        }
    )

})
// https://greensock.com/forums/topic/18771-animate-pixi-graphics/
