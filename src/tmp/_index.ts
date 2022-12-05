// import * as PIXI from 'pixi.js';
// import { gsap, Back, Linear } from 'gsap';
// import { PixiPlugin } from "gsap/dist/PixiPlugin";
//
// PixiPlugin.registerPIXI(PIXI);
// gsap.registerPlugin(PixiPlugin);
//
// function centerIt(graphics) {
//     graphics.position.x = app.screen.width / 2;
//     graphics.position.y = app.screen.height / 2;
//     graphics.pivot.x = app.screen.width / 2;
//     graphics.pivot.y = app.screen.height / 2;
// }
//
// const app = new PIXI.Application({antialias: true, width: 400, height: 400});
// document.body.appendChild(app.view as any);
//
// const graphics = new PIXI.Graphics();
// const graphicsCurved = new PIXI.Graphics();
//
// centerIt(graphics)
// centerIt(graphicsCurved)
//
// // // Rectangle
// // graphics.beginFill(0xDE3249);
// // graphics.drawRect(50, 50, 100, 100);
// // graphics.endFill();
// //
// // // Rectangle + line style 1
// // graphics.lineStyle(2, 0xFEEB77, 1);
// // graphics.beginFill(0x650A5A);
// // graphics.drawRect(200, 50, 100, 100);
// // graphics.endFill();
// //
// // // Rectangle + line style 2
// // graphics.lineStyle(10, 0xFFBD01, 1);
// // graphics.beginFill(0xC34288);
// // graphics.drawRect(350, 50, 100, 100);
// // graphics.endFill();
// //
// // // Rectangle 2
// // graphics.lineStyle(2, 0xFFFFFF, 1);
// // graphics.beginFill(0xAA4F08);
// // graphics.drawRect(530, 50, 140, 100);
// // graphics.endFill();
// //
// // // Circle
// // graphics.lineStyle(0); // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
// // graphics.beginFill(0xDE3249, 1);
// // graphics.drawCircle(100, 250, 50);
// // graphics.endFill();
// //
// // // Circle + line style 1
// // graphics.lineStyle(2, 0xFEEB77, 1);
// // graphics.beginFill(0x650A5A, 1);
// // graphics.drawCircle(250, 250, 50);
// // graphics.endFill();
// //
// // // Circle + line style 2
// // graphics.lineStyle(10, 0xFFBD01, 1);
// // graphics.beginFill(0xC34288, 1);
// // graphics.drawCircle(400, 250, 50);
// // graphics.endFill();
// //
// // // Ellipse + line style 2
// // graphics.lineStyle(2, 0xFFFFFF, 1);
// // graphics.beginFill(0xAA4F08, 1);
// // graphics.drawEllipse(600, 250, 80, 50);
// // graphics.endFill();
// //
// // // draw a shape
// // graphics.beginFill(0xFF3300);
// // graphics.lineStyle(4, 0xffd900, 1);
// // graphics.moveTo(50, 350);
// // graphics.lineTo(250, 350);
// // graphics.lineTo(100, 400);
// // graphics.lineTo(50, 350);
// // graphics.closePath();
// // graphics.endFill();
// //
// // // draw a rounded rectangle
// // graphics.lineStyle(2, 0xFF00FF, 1);
// // graphics.beginFill(0x650A5A, 0.25);
// // graphics.drawRoundedRect(50, 440, 100, 100, 16);
// // graphics.endFill();
// //
// // // draw star
// // graphics.lineStyle(2, 0xFFFFFF);
// // graphics.beginFill(0x35CC5A, 1);
// // graphics.endFill();
// //
// // // draw star 2
// // graphics.lineStyle(2, 0xFFFFFF);
// // graphics.beginFill(0xFFCC5A, 1);
// // graphics.endFill();
// //
// // // draw star 3
// // graphics.lineStyle(4, 0xFFFFFF);
// // graphics.beginFill(0x55335A, 1);
// // graphics.endFill();
// //
// // // draw polygon
// // const path = [600, 370, 700, 460, 780, 420, 730, 570, 590, 520];
// //
// // graphics.lineStyle(0);
// // graphics.beginFill(0x3500FA, 1);
// // graphics.drawPolygon(path);
// // graphics.endFill();
//
// // Ellipse + line style 2
//
// // graphics.beginFill(0xAA4F08, 1);
// // graphics.drawEllipse(200, 200, 80, 80);
// // graphics.endFill();
//
// // graphicsCurved.beginFill(0xAA4F08, 1);
// // graphicsCurved.arc(200, 200, 80, 0, 1)
// // graphicsCurved.endFill();
//
// // app.stage.addChild(graphics);
// app.stage.addChild(graphicsCurved);
//
// // gsap.fromTo(graphics,
// //     {pixi: {fillColor: "green"}},
// //     {pixi: {fillColor: "red", skewX: 10}, duration: 5}
// // )
//
// const RAD = Math.PI / 180;
//
// const arc = {
//     x: 200,
//     y: 200,
//     radius: 90,
//     angle: 0
// };
//
// gsap.to(arc, 1, {
//     angle: 180,
//     repeat: -1,
//     repeatDelay: 0.5,
//     yoyo: true,
//     ease: Linear.easeNone
// })
//
// app.ticker.add(function () {
//     console.log(arc.angle * RAD)
//     graphicsCurved
//         .clear()
//         .beginFill(0xAA4F08, 1)
//         // .lineStyle(30, 0xf44336)
//         .arc(arc.x, arc.y, arc.radius, 0, arc.angle * RAD)
//         .endFill();
// })
//
// document.body.addEventListener('mousemove', (e) => {
//     gsap.to(graphics,
//         {
//             pixi: {
//                 // x: e.x,
//                 // y: e.y
//             }
//             // , duration: 5, ease: Back.easeOut.config(3)
//         }
//     )
//
// })
// // https://greensock.com/forums/topic/18771-animate-pixi-graphics/
