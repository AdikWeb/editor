let loadImageSrc = null;
export function loadImage(src) {
    return new Promise((resolve, reject)=>{
        if(!loadImageSrc){
            const img = loadImageSrc = new Image();
            img.src = src;
            if(img.complete)resolve(img)
            img.onload = ()=> resolve(img)
            img.onerror = ()=> reject(img)
        }else{
            if(loadImageSrc.complete)resolve(loadImageSrc)
        }
    });
}

export function drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) {
    
    2===arguments.length&&(x=y=0,w=ctx.canvas.width,h=ctx.canvas.height);
    offsetX="number"==typeof offsetX?offsetX:.5,offsetY="number"==typeof offsetY?offsetY:.5;
    offsetX<0&&(offsetX=0),offsetY<0&&(offsetY=0),1<offsetX&&(offsetX=1),1<offsetY&&(offsetY=1);

    let iw = img.width,
        ih = img.height,
        r = Math.min(w / iw, h / ih),
        nw = iw * r,   
        nh = ih * r,  
        cx, cy, cw, ch, ar = 1;

    if (nw < w) ar = w / nw;       
    if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh; 

    nw *= ar;
    nh *= ar;

    cw = iw / (nw / w);
    ch = ih / (nh / h);
    cx = (iw - cw) * offsetX;
    cy = (ih - ch) * offsetY;

    cx<0&&(cx=0),cy<0&&(cy=0),cw>iw&&(cw=iw),ch>ih&&(ch=ih);
    ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
    return {img, cx, cy, cw, ch, x, y, w, h, nw, nh, iw, ih};
}