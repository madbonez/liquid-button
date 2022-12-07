import "./index.css";
import * as $gHeVW$pixijs from "pixi.js";
import {gsap as $gHeVW$gsap, Power2 as $gHeVW$Power2} from "gsap";
import {PixiPlugin as $gHeVW$PixiPlugin} from "gsap/dist/PixiPlugin";





function $fab42eb3dee39b5b$export$30ab75b34c35ad58(graphics, pixiApp) {
    graphics.position.x = pixiApp.screen.width / 2;
    graphics.position.y = pixiApp.screen.height / 2;
    graphics.pivot.x = pixiApp.screen.width / 2;
    graphics.pivot.y = pixiApp.screen.height / 2;
}
function $fab42eb3dee39b5b$export$8daab6f91f7ff730(circleProps, graphicCircle) {
    graphicCircle.clear();
    graphicCircle.beginFill(0xAA4F08, 1);
    graphicCircle.drawCircle(circleProps.centerX, circleProps.centerY, circleProps.radius);
    graphicCircle.endFill();
}
function $fab42eb3dee39b5b$export$23922afdb4f79aae(curveProps, graphicCurve) {
    graphicCurve.clear();
    graphicCurve.beginFill(0xAA4F08, 1);
    graphicCurve.moveTo(curveProps.anchor1X, curveProps.anchor1Y);
    graphicCurve.quadraticCurveTo(curveProps.anchorX, curveProps.anchorY, curveProps.anchor2X, curveProps.anchor2Y);
    graphicCurve.endFill();
}



const $7108384065594e65$export$d9a5c63e84da538e = (centerXInit, centerYInit, circleProps, curveProps, circleRadius, boundsRadius, catchRadius)=>{
    let leaveTl;
    let insideTl;
    let lastState = "outside";
    let centerX = centerXInit;
    let centerY = centerYInit;
    return (newSate, pointerX, pointerY, deltaX, deltaY)=>{
        let pointerAngle = Math.atan2(pointerY - centerY, pointerX - centerX) * 180 / Math.PI;
        pointerAngle = pointerAngle < 0 ? pointerAngle + 360 : pointerAngle;
        pointerAngle = pointerAngle * Math.PI / 180;
        if (lastState !== "outside" && newSate === "outside") {
            centerX = centerXInit;
            centerY = centerYInit;
            let anchor1X = centerX + circleRadius * Math.cos(Math.PI * 2 / 5 + pointerAngle);
            let anchor1Y = centerY + circleRadius * Math.sin(Math.PI * 2 / 5 + pointerAngle);
            let anchor2X = centerX + circleRadius * Math.cos(-Math.PI * 2 / 5 + pointerAngle);
            let anchor2Y = centerY + circleRadius * Math.sin(-Math.PI * 2 / 5 + pointerAngle);
            let anchorX = centerX;
            let anchorY = centerY;
            leaveTl = (0, $gHeVW$gsap).timeline();
            leaveTl.add("start").to(curveProps, {
                anchor1X: anchor1X,
                anchor1Y: anchor1Y,
                anchor2Y: anchor2Y,
                anchor2X: anchor2X,
                anchorX: anchorX,
                anchorY: anchorY,
                delay: 0.3,
                ease: "power2.in",
                duration: 0.5
            }).to(circleProps, {
                centerX: centerX,
                centerY: centerY,
                ease: "power2.in",
                delay: 0.3,
                duration: 0.5
            }, "start");
        }
        if (newSate === "entered") {
            let newX = boundsRadius * Math.cos(pointerAngle) + centerXInit;
            let newY = boundsRadius * Math.sin(pointerAngle) + centerYInit;
            let newCenterX = newX - circleRadius * Math.cos(pointerAngle);
            let newCenterY = newY - circleRadius * Math.sin(pointerAngle);
            centerX = newCenterX;
            centerY = newCenterY;
            let anchor1X1 = centerX + circleRadius * Math.cos(Math.PI * 2 / 5 + pointerAngle);
            let anchor1Y1 = centerY + circleRadius * Math.sin(Math.PI * 2 / 5 + pointerAngle);
            let anchor2X1 = centerX + circleRadius * Math.cos(-Math.PI * 2 / 5 + pointerAngle);
            let anchor2Y1 = centerY + circleRadius * Math.sin(-Math.PI * 2 / 5 + pointerAngle);
            let anchorX1 = 2 * pointerX - centerX;
            let anchorY1 = 2 * pointerY - centerY;
            (0, $gHeVW$gsap).to(circleProps, {
                centerX: centerX,
                centerY: centerY,
                //    ease: "power2.in",
                duration: 0.5
            });
            (0, $gHeVW$gsap).to(curveProps, {
                anchor1X: anchor1X1,
                anchor1Y: anchor1Y1,
                anchor2Y: anchor2Y1,
                anchor2X: anchor2X1,
                anchorX: anchorX1,
                anchorY: anchorY1,
                //      ease: "power2.in",
                duration: 0.5
            });
        }
        if (lastState !== "inside" && newSate === "inside") {
            // первый раз отлепить от границы
            centerX = centerX < 200 ? centerX + 1 : centerX - 1;
            centerY = centerY < 200 ? centerY + 1 : centerY - 1;
            let anchor1X2 = centerX + circleRadius * Math.cos(Math.PI * 2 / 5 + pointerAngle);
            let anchor1Y2 = centerY + circleRadius * Math.sin(Math.PI * 2 / 5 + pointerAngle);
            let anchor2X2 = centerX + circleRadius * Math.cos(-Math.PI * 2 / 5 + pointerAngle);
            let anchor2Y2 = centerY + circleRadius * Math.sin(-Math.PI * 2 / 5 + pointerAngle);
            let anchorX2 = centerX;
            let anchorY2 = centerY;
            insideTl = (0, $gHeVW$gsap).timeline().to(circleProps, {
                centerX: centerX,
                centerY: centerY,
                ease: (0, $gHeVW$Power2).easeOut
            });
            (0, $gHeVW$gsap).to(curveProps, {
                anchor1X: anchor1X2,
                anchor1Y: anchor1Y2,
                anchor2Y: anchor2Y2,
                anchor2X: anchor2X2,
                anchorX: anchorX2,
                anchorY: anchorY2,
                ease: (0, $gHeVW$Power2).easeOut
            });
        }
        if (lastState === "inside" && newSate === "inside") {
            let newCenterX1 = centerX + deltaX * (boundsRadius - circleRadius) / boundsRadius;
            let newCenterY1 = centerY + deltaY * (boundsRadius - circleRadius) / boundsRadius;
            centerX = newCenterX1;
            centerY = newCenterY1;
            let anchor1X3 = centerX + circleRadius * Math.cos(Math.PI * 2 / 5 + pointerAngle);
            let anchor1Y3 = centerY + circleRadius * Math.sin(Math.PI * 2 / 5 + pointerAngle);
            let anchor2X3 = centerX + circleRadius * Math.cos(-Math.PI * 2 / 5 + pointerAngle);
            let anchor2Y3 = centerY + circleRadius * Math.sin(-Math.PI * 2 / 5 + pointerAngle);
            let distanceBetweenCenterMouse = Math.ceil(Math.sqrt(Math.pow(pointerX - centerXInit, 2) + Math.pow(pointerY - centerYInit, 2)));
            let anchorX3;
            let anchorY3;
            if (distanceBetweenCenterMouse > boundsRadius - 20) {
                anchorX3 = 2 * pointerX - centerX;
                anchorY3 = 2 * pointerY - centerY;
            } else {
                anchorX3 = centerX;
                anchorY3 = centerY;
            }
            (0, $gHeVW$gsap).to(circleProps, {
                centerX: centerX,
                centerY: centerY,
                ease: "none"
            });
            (0, $gHeVW$gsap).to(curveProps, {
                anchor1X: anchor1X3,
                anchor1Y: anchor1Y3,
                anchor2Y: anchor2Y3,
                anchor2X: anchor2X3,
                anchorX: anchorX3,
                anchorY: anchorY3,
                duration: 0.5,
                ease: "none"
            });
        //  }
        }
        lastState = newSate;
    };
};


(0, $gHeVW$PixiPlugin).registerPIXI($gHeVW$pixijs);
(0, $gHeVW$gsap).registerPlugin((0, $gHeVW$PixiPlugin));
const $149c1bd638913645$var$RADIUS = 100;
const $149c1bd638913645$var$BOUNDS_RADIUS = 150;
const $149c1bd638913645$var$CATCH_RADIUS = 180;
const $149c1bd638913645$var$app = new $gHeVW$pixijs.Application({
    antialias: true,
    width: 440,
    height: 440,
    backgroundColor: 0xFFFFFF
});
document.querySelector("#lq-button-submit").appendChild($149c1bd638913645$var$app.view);
const $149c1bd638913645$var$container = new $gHeVW$pixijs.Container();
$149c1bd638913645$var$container.hitArea = new $gHeVW$pixijs.Rectangle(0, 0, 440, 440);
$149c1bd638913645$var$container.interactive = true;
// сегмент круга. эффект жвачки
const $149c1bd638913645$var$graphicCurve = new $gHeVW$pixijs.Graphics();
// анимированный круг
const $149c1bd638913645$var$graphicCircle = new $gHeVW$pixijs.Graphics();
// внутри начинает притягиваться к курсору
const $149c1bd638913645$var$graphicsHiddenCatchCircle = new $gHeVW$pixijs.Graphics();
// внутри двигаем круг вместе с курсором
const $149c1bd638913645$var$graphicsHiddenBoundsCircle = new $gHeVW$pixijs.Graphics();
$149c1bd638913645$var$container.addChild($149c1bd638913645$var$graphicCurve);
$149c1bd638913645$var$container.addChild($149c1bd638913645$var$graphicCircle);
$149c1bd638913645$var$container.addChild($149c1bd638913645$var$graphicsHiddenCatchCircle);
$149c1bd638913645$var$container.addChild($149c1bd638913645$var$graphicsHiddenBoundsCircle);
(0, $fab42eb3dee39b5b$export$30ab75b34c35ad58)($149c1bd638913645$var$graphicCurve, $149c1bd638913645$var$app);
(0, $fab42eb3dee39b5b$export$30ab75b34c35ad58)($149c1bd638913645$var$graphicCircle, $149c1bd638913645$var$app);
(0, $fab42eb3dee39b5b$export$30ab75b34c35ad58)($149c1bd638913645$var$graphicsHiddenCatchCircle, $149c1bd638913645$var$app);
(0, $fab42eb3dee39b5b$export$30ab75b34c35ad58)($149c1bd638913645$var$graphicsHiddenBoundsCircle, $149c1bd638913645$var$app);
const $149c1bd638913645$var$centerXInit = $149c1bd638913645$var$app.screen.width / 2, $149c1bd638913645$var$centerYInit = $149c1bd638913645$var$app.screen.height / 2;
const $149c1bd638913645$var$offsetX = $149c1bd638913645$var$app.view.getBoundingClientRect().x, $149c1bd638913645$var$offsetY = $149c1bd638913645$var$app.view.getBoundingClientRect().y;
const // смещение крайних точек сегмента от горизонта
$149c1bd638913645$var$degreeOffset = 30, $149c1bd638913645$var$circleLeft = 180, $149c1bd638913645$var$circleRight = 0;
let $149c1bd638913645$var$anchor1X, $149c1bd638913645$var$anchor1Y, $149c1bd638913645$var$anchor2X, $149c1bd638913645$var$anchor2Y, $149c1bd638913645$var$anchorMiddleX, $149c1bd638913645$var$anchorMiddleY, $149c1bd638913645$var$centerX, $149c1bd638913645$var$centerY;
$149c1bd638913645$var$graphicsHiddenCatchCircle.beginFill(0, 0.101);
$149c1bd638913645$var$graphicsHiddenCatchCircle.drawCircle($149c1bd638913645$var$centerXInit, $149c1bd638913645$var$centerYInit, $149c1bd638913645$var$CATCH_RADIUS);
$149c1bd638913645$var$graphicsHiddenCatchCircle.endFill();
$149c1bd638913645$var$graphicsHiddenBoundsCircle.beginFill(0, 0.101);
$149c1bd638913645$var$graphicsHiddenBoundsCircle.drawCircle($149c1bd638913645$var$centerXInit, $149c1bd638913645$var$centerYInit, $149c1bd638913645$var$BOUNDS_RADIUS);
$149c1bd638913645$var$graphicsHiddenBoundsCircle.endFill();
$149c1bd638913645$var$app.stage.addChild($149c1bd638913645$var$container);
const $149c1bd638913645$var$circleProps = {
    centerX: $149c1bd638913645$var$centerXInit,
    centerY: $149c1bd638913645$var$centerYInit,
    radius: $149c1bd638913645$var$RADIUS
};
const $149c1bd638913645$var$curveProps = {
    anchorX: $149c1bd638913645$var$centerXInit,
    anchorY: $149c1bd638913645$var$centerYInit,
    anchor1X: $149c1bd638913645$var$centerXInit,
    anchor1Y: $149c1bd638913645$var$centerYInit,
    anchor2Y: $149c1bd638913645$var$centerYInit,
    anchor2X: $149c1bd638913645$var$centerXInit
};
(0, $fab42eb3dee39b5b$export$8daab6f91f7ff730)($149c1bd638913645$var$circleProps, $149c1bd638913645$var$graphicCircle);
const $149c1bd638913645$var$stateListenerHandler = (0, $7108384065594e65$export$d9a5c63e84da538e)($149c1bd638913645$var$centerXInit, $149c1bd638913645$var$centerYInit, $149c1bd638913645$var$circleProps, $149c1bd638913645$var$curveProps, $149c1bd638913645$var$RADIUS, $149c1bd638913645$var$BOUNDS_RADIUS, $149c1bd638913645$var$CATCH_RADIUS);
$149c1bd638913645$var$container.on("mousemove", (e)=>{
    let pointerX = e.x - $149c1bd638913645$var$offsetX, pointerY = e.y - $149c1bd638913645$var$offsetY;
    const pointerInsideMagnitudeBounds = $149c1bd638913645$var$graphicsHiddenCatchCircle.containsPoint({
        x: pointerX,
        y: pointerY
    });
    const pointerInsideCircleBounds = $149c1bd638913645$var$graphicsHiddenBoundsCircle.containsPoint({
        x: pointerX,
        y: pointerY
    });
    let nextState;
    if (pointerInsideMagnitudeBounds) nextState = "entered";
    if (pointerInsideCircleBounds) nextState = "inside";
    if (!pointerInsideMagnitudeBounds && !pointerInsideCircleBounds) nextState = "outside";
    if (nextState) $149c1bd638913645$var$stateListenerHandler(nextState, pointerX, pointerY, e.movement.x, e.movement.y);
});
// main animation loop
$149c1bd638913645$var$app.ticker.add(()=>{
    (0, $fab42eb3dee39b5b$export$8daab6f91f7ff730)($149c1bd638913645$var$circleProps, $149c1bd638913645$var$graphicCircle);
    (0, $fab42eb3dee39b5b$export$23922afdb4f79aae)($149c1bd638913645$var$curveProps, $149c1bd638913645$var$graphicCurve);
});


//# sourceMappingURL=index.js.map
