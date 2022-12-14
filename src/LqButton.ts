import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import { PixiPlugin } from "gsap/dist/PixiPlugin";
import {centerIt, drawCircle, isEqual} from './utils';
import { stateListener } from './stateListener';
import { clickCircle } from './clickCircle';


export class LqButton {
    private graphicsText: PIXI.Text;
    private lastCircleProps = {};
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
        const CATCH_RADIUS = this.radius*4.1/3;
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
        canvas.height = SIZE;
        const ctx = canvas.getContext('2d');
        const grd = ctx.createLinearGradient(0, 0, 0, SIZE);

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

        container.addChild(graphicCircle)
        container.addChild(graphicsHiddenCatchCircle)
        container.addChild(graphicsHiddenBoundsCircle)
        container.addChild(this.graphicsText)

        centerIt(graphicCircle, app)
        centerIt(graphicsHiddenCatchCircle, app)
        centerIt(graphicsHiddenBoundsCircle, app)

        const centerXInit = app.screen.width / 2,
            centerYInit = app.screen.height / 2;

        const
            offsetX = () => app.view.getBoundingClientRect().x,
            offsetY = () => app.view.getBoundingClientRect().y;

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


        drawCircle(circleProps, graphicCircle, gradient);
        this.graphicsText.x = circleProps.centerX - this.graphicsText.width / 2;
        this.graphicsText.y = circleProps.centerY - this.graphicsText.height / 2;
        this.graphicsText.alpha = 1;

        const stateListenerHandler = stateListener(centerXInit, centerYInit, circleProps, RADIUS, BOUNDS_RADIUS, CATCH_RADIUS, SIZE, this.graphicsText );
        const clickCircleHandler = clickCircle(centerXInit, centerYInit, circleProps, RADIUS, BOUNDS_RADIUS, CATCH_RADIUS, SIZE, this.graphicsText );

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

        container.on('click', (e: PIXI.FederatedPointerEvent) => {

            let
                pointerX = e.x - offsetX(),
                pointerY = e.y - offsetY();

            const pointerInsideCircleBounds = graphicsHiddenBoundsCircle.containsPoint({
                x: pointerX,
                y: pointerY
            });

            if (pointerInsideCircleBounds) {
                clickCircleHandler();
            }

        })
        container.on('mouseleave', (e: PIXI.FederatedPointerEvent) => {
                stateListenerHandler('outside', centerXInit, centerYInit, e.movement.x, e.movement.y);
        })

// main animation loop
        app.ticker.add(() => {
                if (!isEqual(circleProps, this.lastCircleProps) ) {
                    drawCircle(circleProps, graphicCircle, gradient);
                    this.lastCircleProps = Object.assign({}, circleProps)
                }
        })
    }
}
