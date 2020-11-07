import CEvent from "./Events";
import PosSizer from "./PosSizer";
import CanvasDraw from './CanvasDraw';
import { loadImage, drawImageProp } from './common';
import { layersDataTest, tmpLayerDataTest } from './testData'


export default class Canvasina {
    cnvConfig = {
        setParentWidth: false,
    }

    layersData = layersDataTest;
    tmpLayerData = tmpLayerDataTest;

    constructor(cnvId) {
        this.cnvContainer = document.getElementById(cnvId);
    }

    initCanvas() {
        this.cnv = document.createElement('canvas');

        this.cnvContainer.appendChild(this.cnv);
        this.ctx = this.cnv.getContext('2d');

        this.cnv.width = this.cnvContainer.offsetWidth
        this.cnv.height = this.cnvContainer.offsetHeight

        this.cnv.id = 'canvas_' + Date.now();
        this.CanvasDraw = new CanvasDraw(this.ctx);

        CEvent.add('resize', window, () => {
            if (this.cnvConfig.setParentWidth) {
                this.cnv.width = this.cnvContainer.offsetWidth
                this.cnv.height = this.cnvContainer.offsetHeight
            }
        });

        this.update();
    }


    drawBackground() {
        return new Promise((resolve, reject) => {
            loadImage(this.layersData.background).then(img => {
                let { w, h, nw, nh, cx, cy, iw, ih } = drawImageProp(this.ctx, img);
                this.posSizer = new PosSizer(false, nw, nh)

                this.ctx.beginPath();

                this.ctx.rect(...this.posSizer.coord(50, 50, true), ...this.posSizer.size(10, 10));

                this.ctx.strokeStyle = 'red'
                this.ctx.fill();

                console.log(` ${img.width}|${img.height} \n x:${cx} \n y:${cy} \n h:${h} | w:${w} \n nh:${nh} | nw:${nw} \n ${w / 100}`)
               
                document.getElementById('info').innerHTML = `
                    <div> <b>img:</b> ${img.width} | ${img.height}</div>
                    <div> <b>x:</b>   ${cx} | <b>y:</b> ${cy}</div>
                    <div> <b>h:</b>  ${h}  | <b>w:</b>  ${w}</div>
                    <div> <b>nh:</b> ${nh} | <b>nw:</b> ${nw}</div>
                    <div> ${this.posSizer.coord(50, 50, true)} </div>
                 `;

                resolve(img)
            })
        })
    }

    draw() {
        this.drawBackground().then(() => {

            this.drawTmp();
            // this.ctx.beginPath();
            // let test1 = this.posSizer.size(10, 10);
            // this.ctx.rect(...this.posSizer.coord(60, 60, true), ...test1);
            // this.ctx.fill();
            /*            this.ctx.beginPath();
                       let test = this.posSizer.coord(50, 50, false);
                       let test1 = this.posSizer.size(10, 10);
                       let test2 = this.posSizer.pxToPercent(10, 10)
                       this.ctx.rect(...this.posSizer.coord(50, 50, true), ...test1);
           
                       this.ctx.moveTo(...this.posSizer.coord(10, 10, true))
                       this.ctx.lineTo(...this.posSizer.coord(30, 10, true))
                       this.ctx.lineTo(...this.posSizer.coord(30, 30, true))
                       this.ctx.lineTo(...this.posSizer.coord(10, 30, true))
           
                       this.ctx.fill(); */
        })
    }

    drawTmp() {



    }

    update() {
        if (this.cnvConfig.setParentWidth) {
            this.cnv.width = this.cnvContainer.offsetWidth
            this.cnv.height = this.cnvContainer.offsetHeight
        }
        this.cnv.width |= 0;
        this.draw()
        requestAnimationFrame(this.update.bind(this))
    }


    get getWidth() {
        return this.cnv.width
    }

    get getHeight() {
        return this.cnv.height
    }

    /**
     * @param {boolean} a
     */
    set setParentWidth(a) {
        this.cnvConfig.setParentWidth = a;
    }

    /**
     * @param {any} w
     */
    set setWidth(w) {
        this.cnvConfig.setParentWidth = false
        this.cnv.width = w
    }

    /**
     * @param {any} h
     */
    set setHeight(h) {
        this.cnvConfig.setParentWidth = false
        this.cnv.height = h
    }
}

