export default class CanvasDraw {
    constructor(ctx){
        this.ctx = ctx;
    }

    drawPath() {
        this.ctx.beginPath();
                
        this.ctx.stroke();
    }
}