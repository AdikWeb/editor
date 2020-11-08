export default class PosSizer {
    constructor(parent, w, h, dX, dY, isObject = false, percentMode = false) {
        this.pWidth = parent.width;
        this.pHeight = parent.height;
        this.pMode = percentMode;
        this.isObj = isObject;

        this.w = w;
        this.h = h;
        this.dx = dX;
        this.dy = dY;
    }

    calcCoord(percent, parentSize, size, offset, percentMode) {
        if (percentMode) { 
            return size / parentSize * ( percent * parentSize / 100 - offset)
        } else {
            return size / parentSize * ( percent - offset)
        }
    }

    coord(pX, pY) {
        return this.isObj ? { x: this.calcCoord(pX, this.pWidth, this.w, this.dx, this.pMode), y: this.calcCoord(pY, this.pHeight, this.h, this.dy, this.pMode) }
                  : [this.calcCoord(pX, this.pWidth, this.w, this.dx, this.pMode), this.calcCoord(pY, this.pHeight, this.h, this.dy, this.pMode)]; 
    }
}