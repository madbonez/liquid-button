import * as PIXI from 'pixi.js';

export function centerIt(graphics, pixiApp) {
    graphics.position.x = pixiApp.screen.width / 2;
    graphics.position.y = pixiApp.screen.height / 2;
    graphics.pivot.x = pixiApp.screen.width / 2;
    graphics.pivot.y = pixiApp.screen.height / 2;
}

export function drawCircle(circleProps, graphicCircle, graphicsText: PIXI.Text, color: number) {
    graphicCircle.clear();
    graphicCircle.beginFill(color, 1);
    graphicCircle.drawCircle(circleProps.centerX, circleProps.centerY, circleProps.radius);
    graphicCircle.endFill();

    if (graphicsText) {
        graphicsText.x = circleProps.centerX - graphicsText.width / 2;
        graphicsText.y = circleProps.centerY- graphicsText.height / 2;
    }
}

export function drawCurve(curveProps, graphicCurve, color: number) {
    graphicCurve.clear();
    graphicCurve.beginFill(color, 1);
    graphicCurve.moveTo(curveProps.anchor1X, curveProps.anchor1Y)
    graphicCurve.quadraticCurveTo(curveProps.anchorX, curveProps.anchorY, curveProps.anchor2X, curveProps.anchor2Y)
    graphicCurve.endFill();
}


