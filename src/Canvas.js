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
                let { w, h, nw, nh, cx, cy } = drawImageProp(this.ctx, img);
                
                this.posSizer = new PosSizer(img, nw, nh, cx, cy, false, false);
                this.CanvasDraw = new CanvasDraw(this.ctx, this.posSizer, this.layersData);

                console.log(` ${img.width}|${img.height} \n x:${cx} \n y:${cy} \n h:${h} | w:${w} \n nh:${nh} | nw:${nw} \n ${w / 100}`)
               
                document.getElementById('info').innerHTML = `
                    <div> <b>img:</b> ${img.width} | ${img.height}</div>
                    <div> <b>cx:</b>   ${cx} | <b>cy:</b> ${cy}</div>
                    <div> <b>h:</b>  ${h}  | <b>w:</b>  ${w}</div>
                    <div> <b>nh:</b> ${nh} | <b>nw:</b> ${nw}</div>
                    <div> <b>nh:</b>${this.posSizer.coord(10,10, true)}</div>
                 `;

                resolve(img)
            })
        })
    }

    draw() {
        this.drawBackground().then(() => {
            this.drawLayers();
            this.drawTmp();
        })
    }
    drawLayers(){
        for(let layer of this.layersData.layers){
            this.CanvasDraw.drawPath(layer);
            this.CanvasDraw.drawDots(layer);        
        }
    }
    drawTmp() {
        this.CanvasDraw.drawPath(this.tmpLayerData);
        if(this.tmpLayerData.dotsVisible)
            this.CanvasDraw.drawDots(this.tmpLayerData);
    }

    update() {
        this.cnv.width |= 0;
        if (this.cnvConfig.setParentWidth) {
            this.cnv.width = this.cnvContainer.offsetWidth
            this.cnv.height = this.cnvContainer.offsetHeight
        }
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

