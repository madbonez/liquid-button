export function centerIt(graphics, pixiApp) {
    graphics.position.x = pixiApp.screen.width / 2;
    graphics.position.y = pixiApp.screen.height / 2;
    graphics.pivot.x = pixiApp.screen.width / 2;
    graphics.pivot.y = pixiApp.screen.height / 2;
}

export function drawCircle(circleProps, graphicCircle) {
    graphicCircle.clear();
    graphicCircle.beginFill(0xAA4F08, 1);
    graphicCircle.drawCircle(circleProps.centerX, circleProps.centerY, circleProps.radius);
    graphicCircle.endFill();
}

export function drawCurve(curveProps, graphicCurve) {
    graphicCurve.clear();
    graphicCurve.beginFill(0xAA4F08, 1);
    graphicCurve.moveTo(curveProps.anchor1X, curveProps.anchor1Y)
    graphicCurve.quadraticCurveTo(curveProps.anchorX, curveProps.anchorY, curveProps.anchor2X, curveProps.anchor2Y)
    graphicCurve.endFill();
}

export function drawCursor(cursorProps, graphicCursor ) {
    graphicCursor.clear();
    graphicCursor.beginFill(0xAA4F08, 1);
    graphicCursor.drawCircle(cursorProps.centerX, cursorProps.centerY, cursorProps.radius);
    graphicCursor.endFill();
}
