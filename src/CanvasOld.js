import CEvent from "./Events";
import cTransform from "./PosSizer";

class CanvasController {
    constructor(canvasContainer){
        this.canvasContainer = document.getElementById(canvasContainer);
        this.canvasElement = null;
        this.canvasElementContext = null;   
        this.tmpData = [];
        this.allCollision = [];
        this.collisionData = []
        this.deb = null;

        this.pointsRad = 5
        this.spanOnlyFirstPoint = true;

        this.mouse = {x:0, y:0, rad: 100,snapRad: 10, snapPosX:null,snapPosY:null}
    }

    // Base methods
    render(){
        this.mouse.snapPosY = null;
        this.mouse.snapPosX = null;
        this.allCollision = []
        
        if(this.collisionData.length){
            for(let [i, data] of Object.entries(this.collisionData)){
                this.drawPath(data, i);
                this.createCircle(data);
            }
        }
      
    }

    collision(){
        let tmpData = JSON.parse(JSON.stringify(this.tmpData));
        if(tmpData.length){
            for(let [i, el] of Object.entries(tmpData)){
                let d = Math.sqrt(Math.pow(el.x - this.mouse.x, 2) + Math.pow(el.y - this.mouse.y, 2));
                if(d <= this.mouse.rad){
                    this.allCollision.push(d);
                    el.fill = true;
                    el.color = 'red';
                    if(Math.min(...this.allCollision) === d && d <= this.mouse.snapRad + this.pointsRad){
                        el.color = 'black';
                        this.deb = el.first;

                        if(this.spanOnlyFirstPoint){
                                this.mouse.snapPosY = el.first&&el.y;
                                this.mouse.snapPosX = el.first&&el.x;                                
                        }else{
                            this.mouse.snapPosY = el.y;
                            this.mouse.snapPosX = el.x;
                        }
                    }
                }
            }
        }
        this.collisionData = tmpData;
    }
    
    update(){
        this.canvasElement.width |= 0
        this.collision();
        this.createCircle({x:this.mouse.x, y:this.mouse.y, r:this.mouse.rad, color:'red'});
        this.createCircle({
            x:this.mouse.snapPosX||this.mouse.x,
            y:this.mouse.snapPosY||this.mouse.y,
            r:this.mouse.snapRad,
            color:'black'
        });

        this.canvasElementContext.fillText(this.deb, 100, 100);
        this.render();
        window.requestAnimationFrame(this.update.bind(this));
    }

    // Creating methods
    createPath(...path){
        return new Path2D(...path);
    }

    createCircle({x,y, r = this.pointsRad, color = 'black', fill = false}){
        this.canvasElementContext.fillStyle = color;
        this.canvasElementContext.strokeStyle = color;
        this.canvasElementContext.beginPath();
        this.canvasElementContext.arc(x,y, r, 0, 2 * Math.PI);
        this.canvasElementContext[fill?'fill':'stroke']();
    }

    drawPath(data, index){
    
        if(index === '0'){
            this.canvasElementContext.beginPath();
            this.canvasElementContext.moveTo(data.x, data.y)
        }

        this.canvasElementContext.lineTo(data.x,data.y);
        this.canvasElementContext.closePath();
        this.canvasElementContext.stroke();
    }
    
}


export default class Canvas extends CanvasController{
    ctx = null;
    currentPath = null;
    parentSize = true;
    canvasCursor = null;

    initCanvas(){
        this.canvasElement = document.createElement('canvas');
        this.canvasContainer.appendChild(this.canvasElement);
        this.ctx = this.canvasElementContext = this.canvasElement.getContext('2d')
        
        if(this.parentSize){
            this.canvasElement.width = this.canvasContainer.offsetWidth
            this.canvasElement.height = this.canvasContainer.offsetHeight
        }

        CEvent.add('click',this.canvasElement, this.clickOnCanvas.bind(this))
        CEvent.add('mousemove',this.canvasElement,this.moveCursor.bind(this))

        this.update()
    }

    moveCursor({layerX, layerY}){
        [this.mouse.x, this.mouse.y] = [layerX, layerY]
    }

    clickOnCanvas({layerX, layerY}){
        let closePath = this.tmpData.length>2&&(this.tmpData[0].x===this.mouse.snapPosX&&this.tmpData[0].y===this.mouse.snapPosY);
        
        let positionCursot = {
            x:this.mouse.snapPosX||layerX,
            y:this.mouse.snapPosY||layerY
        };

        let data = {
            id:Date.now(),
            x:positionCursot.x,
            y:positionCursot.y,
            first:this.tmpData.length<1,
            close:closePath,
        }

        this.tmpData.push(data);
    }
}
