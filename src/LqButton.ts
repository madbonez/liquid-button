import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import { PixiPlugin } from "gsap/dist/PixiPlugin";
import {centerIt, drawCircle, drawCurve, isEqual} from './utils';
import { stateListener } from './stateListener';

export class LqButton {
    private graphicsText: PIXI.Text;
    private lastCircleProps = {};
    private lastCurveProps = {};
    constructor(
        private rootElement: HTMLElement,
        public text: string,
        private debugMode: boolean,
        private color: number,
        private textColor: number,
        private heightGradient: number,
        private font: {size: number, lineHeight: number, fontFamily: string},
        private size: number,
        private radius: number,
    ) {
        this.init();
    }

    setText(text) {
        this.text = text;
        this.graphicsText.text = this.text;
    }

    private init() {
        PixiPlugin.registerPIXI(PIXI);
        gsap.registerPlugin(PixiPlugin);

        const RADIUS = this.radius;
        const BOUNDS_RADIUS = this.radius*4/3;
        const CATCH_RADIUS = this.radius*17/12;
        const SIZE = this.size;

        const app = new PIXI.Application({
            antialias: true,
            width: SIZE ,
            height: SIZE ,
            backgroundColor: 0x000000,
            backgroundAlpha: this.debugMode ? 1 : 0
        });

        this.rootElement.appendChild(app.view as any);

        const container = new PIXI.Container();
        container.interactive = true;
        container.interactiveChildren = true;
        container.hitArea = new PIXI.Rectangle(0, 0, SIZE , SIZE );

// сегмент круга. эффект жвачки
        const graphicCurve = new PIXI.Graphics();
        graphicCurve.interactive = true;
        graphicCurve.cursor = 'pointer';
// анимированный круг
        const graphicCircle = new PIXI.Graphics();
        graphicCircle.interactive = true;
        graphicCircle.cursor = 'pointer';

// внутри начинает притягиваться к курсору
        const graphicsHiddenCatchCircle = new PIXI.Graphics();
        graphicsHiddenCatchCircle.interactive = true;
        graphicsHiddenCatchCircle.cursor = 'pointer'
// внутри двигаем круг вместе с курсором
        const graphicsHiddenBoundsCircle = new PIXI.Graphics();
        graphicsHiddenBoundsCircle.interactive = true;
        graphicsHiddenBoundsCircle.cursor = 'pointer'

        this.graphicsText = new PIXI.Text(this.text, {
            fontFamily: this.font.fontFamily,
            fontSize: this.font.size,
            lineHeight: this.font.lineHeight,
            fill: this.textColor,
        });

        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 400;
        const ctx = canvas.getContext('2d');
        const grd = ctx.createLinearGradient(0, 0, 0, 400);


        function createGradTexture(color1, color2, size, heightGradient: number) {
            const lineY = heightGradient / canvas.height;

            grd.addColorStop(0, '#ff9300');
            grd.addColorStop(lineY, '#ff9300');
            grd.addColorStop(lineY, '#FFFFFF');
            grd.addColorStop(1, '#FFFFFF');
            ctx.fillStyle = grd;
            ctx.fillRect(0, 0, size, size);

            return PIXI.Texture.from(canvas);
        }

        const gradient = createGradTexture(this.color, this.textColor, SIZE, this.heightGradient)

        container.addChild(graphicCurve)
        container.addChild(graphicCircle)
        container.addChild(graphicsHiddenCatchCircle)
        container.addChild(graphicsHiddenBoundsCircle)
        container.addChild(this.graphicsText)

        centerIt(graphicCurve, app)
        centerIt(graphicCircle, app)
        centerIt(graphicsHiddenCatchCircle, app)
        centerIt(graphicsHiddenBoundsCircle, app)

        const centerXInit = app.screen.width / 2,
            centerYInit = app.screen.height / 2;

        const
            offsetX = () => app.view.getBoundingClientRect().x,
            offsetY = () => app.view.getBoundingClientRect().y;

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

        graphicsHiddenCatchCircle.beginFill(0, this.debugMode ? 0.101 : 0.001);
        graphicsHiddenCatchCircle.drawCircle(centerXInit, centerYInit, CATCH_RADIUS);
        graphicsHiddenCatchCircle.endFill();

        graphicsHiddenBoundsCircle.beginFill(0, this.debugMode ? 0.101 : 0.001);
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

        drawCircle(circleProps, graphicCircle, this.graphicsText, gradient);
        const stateListenerHandler = stateListener(centerXInit, centerYInit, circleProps, curveProps, RADIUS, BOUNDS_RADIUS, CATCH_RADIUS);

        container.on('mousemove', (e: PIXI.FederatedPointerEvent) => {
            let
                pointerX = e.x - offsetX(),
                pointerY = e.y - offsetY();

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
                if (!isEqual(circleProps, this.lastCircleProps) ||
                    !isEqual(curveProps, this.lastCurveProps)) {
                    drawCircle(circleProps, graphicCircle, this.graphicsText, gradient);
                    drawCurve(curveProps, graphicCurve, gradient);
                    this.lastCircleProps = Object.assign({}, circleProps)
                    this.lastCurveProps = Object.assign({}, curveProps)
                }
        })
    }
}
