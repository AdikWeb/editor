import CEvent from "./Events";

class CanvasController {
    constructor(canvasContainer){
        this.canvasContainer = document.getElementById(canvasContainer);
        this.canvasElement = null;        
        this.canvasElementContext = null;   
        this.canvasSnap = false;
    }

    /**
     * @param {any} el
     */
    set setCanvasElement(el){
        this.canvasElement = el;
    }
    
    /**
     * @param {any} context
     */
    set setCanvasElement(context){
        this.canvasElementContext = context;
    }

    /**
     * @param {any} span
     */
    set setcanvasSnap(span){
        this.canvasElementContext = span;
    }

    // Base methods
    render(){
        
    }
    update(){

    }

    // Creating methods
    createPath(...path){
        return new Path2D(...path);
    }

    createCircle(...ar){
        let a = new Path2D();
        a.arc(...ar);
        return a;
    }
}

export default class Canvas extends CanvasController{
    ctx = null;
    tmpData = [];
    currentPath = null;

    initCanvas(){
        this.canvasElement = document.createElement('canvas');
        this.canvasContainer.appendChild(this.canvasElement);
        this.ctx = this.canvasElementContext = this.canvasElement.getContext('2d')

        CEvent.add('click',this.canvasElement, this.clickOnCanvas.bind(this))
    }

    clickOnCanvas(){
        if(this.currentPath){
            console.log(this.currentPath)
            
        }else{
            this.currentPath = this.createPath();
        }
    }
}
