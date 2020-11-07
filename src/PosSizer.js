export default class PosSizer {
    constructor(parent, w, h, oX, oY) {
        this.pWidth = parent.offsetWidth || parent.width || w;
        this.pHeight = parent.offsetHeight || parent.height || h;
        this.x = oX;
        this.y = oY;
    }

    calc(n, s, inv = false) {
        return inv ? n * s / 100 : n * 100 / s
    }

    pxToPercent(x, y) {
        return { x: this.calc(x, this.pWidth), y: this.calc(y, this.pHeight) };
    }

    percentToPx(x, y) {
        return { x: this.calc(x, this.pWidth, true), y: this.calc(y, this.pHeight, true) };
    }

    size(ww, hh, ob = false) {
        let iw = this.calc(ww, this.pWidth, true);
        let ih = this.calc(hh, this.pHeight, true);
        console.log([iw, ih])
        return ob ? { x: iw, y: ih } : [iw, ih];
    }

    coord(x, y, ob = true, p = false) {
        const coordPx = this.percentToPx(x, y);
        const coordPe = this.pxToPercent(x, y);
        
        if (p) {
            return ob ? [this.x + coordPe.x, this.y + coordPe.y] : { x: coordPe.x, y: coordPe.y }
        } else {
            return ob ? [this.x + coordPx.x, this.y + coordPx.y] : { x: coordPx.x, y: coordPx.y }
        }

        // if (p) {
        //     return ob ? [this.p + coordPe.x, this.y + coordPe.y] : { x: coordPe.x, y: coordPe.y }
        // } else {
        //     return ob ? [this.pWidth + coordPx.x, this.pHeight + coordPx.y] : { x: coordPx.x, y: coordPx.y }
        // }
    }

    setFillPosition(el) {

    }
}