import * as PIXI from 'pixi.js';

export function centerIt(graphics, pixiApp) {
    graphics.position.x = pixiApp.screen.width / 2;
    graphics.position.y = pixiApp.screen.height / 2;
    graphics.pivot.x = pixiApp.screen.width / 2;
    graphics.pivot.y = pixiApp.screen.height / 2;
}

export function drawCircle(circleProps, graphicCircle, gradient:PIXI.Texture) {

    graphicCircle.clear();
    graphicCircle.beginTextureFill({texture: gradient});
    graphicCircle.drawCircle(circleProps.centerX, circleProps.centerY, circleProps.radius);
    graphicCircle.endFill();
}

export function isEqual(object1, object2) {
    const props1 = Object.getOwnPropertyNames(object1);
    const props2 = Object.getOwnPropertyNames(object2);
    if (props1.length !== props2.length) {
        return false;
    }
    for (let i = 0; i < props1.length; i += 1) {
        const prop = props1[i];
        if (object1[prop] !== object2[prop]) {
            return false;
        }
    }

    return true;
}
