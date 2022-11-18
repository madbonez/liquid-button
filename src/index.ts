import * as PIXI from 'pixi.js';
import {gsap} from 'gsap';
import {PixiPlugin} from "gsap/dist/PixiPlugin";
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
    // 2R * sin(δ / 2)

    let
        offsetX = app.view.getBoundingClientRect().x,
        offsetY = app.view.getBoundingClientRect().y,
        pointerX = e.x - offsetX,
        pointerY = e.y - offsetY,
        magnetismCondition = pointerX > RADIUS/4 && pointerX < app.screen.width - RADIUS/4 && pointerY > RADIUS/4 && pointerY < app.screen.height - RADIUS/4 ,
        /* centerX = pointerX,
         centerY = pointerY,*/
        RadiusMoveCircle = app.screen.width / 2 - RADIUS / 2,
        centerX = magnetismCondition ? (pointerX > RadiusMoveCircle && pointerX < app.screen.width - RadiusMoveCircle) ? pointerX : pointerX < RadiusMoveCircle ? RadiusMoveCircle : app.screen.width - RadiusMoveCircle : app.screen.width/2 ,
        centerY = magnetismCondition ? (pointerY > RadiusMoveCircle && pointerY < app.screen.height - RadiusMoveCircle) ? pointerY : pointerY < RadiusMoveCircle ? RadiusMoveCircle : app.screen.height - RadiusMoveCircle : app.screen.height/2,
        /*    centerX = app.screen.width / 2,
            centerY = app.screen.height / 2,*/
        // угол между центром квадрата и лучом от указателя мыши к центру
        pointerAngle = Math.atan2(pointerY - centerY, pointerX - centerX) * 180 / Math.PI + 90,
        // насколько сместиться по окружности точкам
        degreeOffset = 30,
        circleLeft = 180,
        circleRight = 0,
      //  circleMiddle = 270,
        anchor1X = centerX + RADIUS * Math.cos((circleLeft + degreeOffset + pointerAngle) * RAD),
        anchor1Y = centerY + RADIUS * Math.sin((circleLeft + degreeOffset + pointerAngle) * RAD),
        anchor2X = centerX + RADIUS * Math.cos((circleRight - degreeOffset + pointerAngle) * RAD),
        anchor2Y = centerY + RADIUS * Math.sin((circleRight - degreeOffset + pointerAngle) * RAD),
        anchorX = magnetismCondition ? 2 * pointerX - centerX : app.screen.width/2,
        anchorY = magnetismCondition ? 2 * pointerY - centerY : app.screen.height/2
    ;


    console.log(pointerAngle)

    graphicCurve.clear();
    graphicCurve.beginFill(0xAA4F08, 1);
    graphicCurve.moveTo(anchor1X, anchor1Y)
    // xz
    // const middleYPoint = centerY - RADIUS * Math.sin(circleMiddle * RAD);
    graphicCurve.quadraticCurveTo(anchorX, anchorY, anchor2X, anchor2Y)
    graphicCurve.endFill();
    graphicCircle.clear();
    graphicCircle.beginFill(0xAA4F08, 0.7);
    graphicCircle.drawEllipse(centerX, centerY, RADIUS, RADIUS);
    graphicCircle.endFill();
})


const graphicCurve = new PIXI.Graphics();
const graphicCircle = new PIXI.Graphics();
container.addChild(graphicCurve)
container.addChild(graphicCircle)

centerIt(graphicCurve)
centerIt(graphicCircle)


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
