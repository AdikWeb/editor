console.clear();

import Canvasina from './Canvas';
import './main.scss';

const canvasina = new Canvasina('canvasContainer');

onload = ()=>{
canvasina.setParentWidth = true;
canvasina.initCanvas()
document.querySelector('[svg-input=widthcanvas]').value = canvasina.getWidth
document.querySelector('[svg-input=heightcanvas]').value = canvasina.getHeight
}

document.querySelector('[svg-input=widthcanvas]').addEventListener('input', function(e){
    canvasina.setWidth = +this.value
})

document.querySelector('[svg-input=heightcanvas]').addEventListener('input', function(e){
    canvasina.setHeight = +this.value
})

document.querySelector('[svg-tools=resetWidth]').addEventListener('click', function(e){
    canvasina.setParentWidth = true
})