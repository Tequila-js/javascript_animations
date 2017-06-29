window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                               window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
window.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame ||
                              window.webkitCancelAnimationFrame || window.msCancelAnimationFrame;

function getMaxValues() {
  return {
    maxWidth: window.innerWidth || (document.documentElement || document).clientWidth,
    maxHeight: window.innerHeight || (document.documentElement || document).clientHeight
  };
}

function returnRandomColor() {
  return `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(Math.random() * 255)}, ${Math.ceil(Math.random() * 255)})`;
}

class TriangleCanvas {
  constructor(canvas, height, width) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    [this.height, this.width] = [height, width];
    
    [canvas.height, canvas.width] = [height, width];
    
    this.context.fillStyle = '#f6f6f6';
    this.context.fillRect(0, 0, this.width, this.height);
  }
  
  drawTriangle() {
    let translationValue = Math.random() > 5? Math.random() * 30: - Math.random() * 30,
      pos1 = (Math.random() * this.height) + (Math.random() > 0.5 ? Math.random() * 500 : - Math.random() * 500),
      pos2 = (Math.random() * this.width) + (Math.random() > 0.5 ? Math.random() * 500 : - Math.random() * 500),
      variation = Math.random() > 0.5,
      random1 = Math.random() * (Math.random() > 0.5 ? this.height : this.width),
      random2 = Math.random() * (Math.random() > 0.5 ? this.height : this.width),
      random3 = Math.random() * (Math.random() > 0.5 ? this.height : this.width),
      random4 = Math.random() * (Math.random() > 0.5 ? this.height : this.width);

    this.context.beginPath();
    if (variation) {
      this.context.moveTo(pos1 + translationValue, pos2 + translationValue);
      this.context.lineTo(random1 + translationValue, random2 + translationValue);
      this.context.lineTo(random3 + translationValue, random4 + translationValue);  
    } else {
      this.context.moveTo(pos2 + translationValue, pos1 + translationValue);
      this.context.lineTo(random2 + translationValue, random1 + translationValue);
      this.context.lineTo(random4 + translationValue, random3 + translationValue);  
    }
    this.context.closePath();  
    
    this.context.fillStyle = 'rgba(0, 0, 0, .4)';
    this.context.fill();
    
    this.context.beginPath();
    if (variation) {
      this.context.moveTo(pos1, pos2);
      this.context.lineTo(random1, random2);
      this.context.lineTo(random3, random4);  
    } else {
      this.context.moveTo(pos2, pos1);
      this.context.lineTo(random2, random1);
      this.context.lineTo(random4, random3);  
    }
    this.context.closePath();
    
    this.context.fillStyle = returnRandomColor();
    this.context.fill();
  }
}

(function initDemo03 () {
  let canvasDOMObj = document.querySelector('canvas'),
    sizes = getMaxValues(),
    canvas = new TriangleCanvas(canvasDOMObj, sizes.maxHeight, sizes.maxWidth);
  
  canvas.drawTriangle();
  setInterval(() => canvas.drawTriangle(), 350);
}());