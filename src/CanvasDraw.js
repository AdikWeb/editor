// TODO Сделать индивидуальную заливку точек
// TODO Потом переделать Рекурсивную функцию по чтению параметров
//? гы, а может и не сделаю :D

export default class CanvasDraw {
    constructor(ctx, sizer, layersData) {
        this.ctx = ctx;
        this.sizer = sizer;
        this.layersData = layersData;
    }

    drawDots(layer) {
        for (let [i, item] of Object.entries(layer.path)) {
            this.ctx.beginPath();
            let coord = this.sizer.coord(item.x, item.y, true);
            this.ctx.fillStyle = item.dotsFillColor || layer.dotsFillColor || layer.fillColor || this.layersData.fillColor || 'black';
            this.ctx.strokeStyle = item.dotsStrokeColor || layer.dotsStrokeColor || layer.strokeColor || this.layersData.strokeColor || 'black';
            this.ctx.lineWidth = item.dotsStrokeColor || layer.dotsStrokeWidth || layer.strokeWidth || this.layersData.strokeWidth || 2;
            this.ctx.arc(...coord, item.dotsRad || layer.dotsRad || this.layersData.dotsRad || 5, 0, 2 * Math.PI);
            this.ctx.stroke();
        }
    }

    drawPath(layer) {
        this.ctx.beginPath();
        for (let [i, item] of Object.entries(layer.path)) {
            let coord = this.sizer.coord(item.x, item.y, true);
            if (i == 0) this.ctx.moveTo(...coord)
            this.ctx.lineTo(...coord);
        }
        this.ctx.fillStyle = layer.fillColor || this.layersData.fillColor || 'black';
        this.ctx.strokeStyle = layer.strokeColor || this.layersData.strokeColor || 'black';
        this.ctx.lineWidth = layer.strokeWidth || this.layersData.strokeWidth || 2;
        if (layer.closed) this.ctx.closePath();
        if (layer.fill) this.ctx.fill();
        this.ctx.stroke();
    }
}