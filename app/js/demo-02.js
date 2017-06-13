window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                               window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
window.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame ||
                              window.webkitCancelAnimationFrame || window.msCancelAnimationFrame;

class Drop {
  constructor(x = 0, y = 0) {
    [this.x, this.y, this.speed, this.width, this.height, this.shouldFall] =[x, y, Math.random() * 10 + 1, Math.random() * .5 + 1, Math.random() * 50 + 30, Math.random() * 10 > 5];
  }

  getValues() {
    let [x, y, speed, width, height, shouldFall] = [this.x, this.y, this.speed, this.width, this.height, this.shouldFall];
    return ({x, y, width, height, speed});
  }

  updateYPos(y) {
    this.y = y;
  }
}

class RainyCanvas {
  constructor(canvas) {
    [this.limit, this.current] = [255, 0];
    this.decreasing = true;
    this.drops = [... Array(parseInt(Math.random() * 1000 + 30))];
    this.drops = this.drops.map(item => new Drop(Math.random() * canvas.width, Math.random() * canvas.height));
  }

  drawInCanvas(canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.drops.forEach(item => {
      let [values, newVal] = [item.getValues(), 0],
        lineColor = `rgb(${parseInt(Math.random() * 255)}, ${parseInt(Math.random() * 255)}, ${parseInt(Math.random() * 255)})`;

      ctx.lineWidth = .5;
      ctx.fillStyle = lineColor;
      ctx.fillRect(values.x, values.y, values.width, values.height);

      if (item.shouldFall) {
        newVal = values.y + values.speed > canvas.height ? 0 : values.y + values.speed
      } else {
        newVal = values.y - values.speed <= 0 ? canvas.height : values.y - values.speed;
      }

      item.updateYPos(newVal);
    });
  }
}

(function () {
  let canvas = document.querySelector('canvas'),
		ctx = canvas.getContext("2d"),
    canvasHandler = null;

  canvas.width = window.innerWidth || document.clientWidth || document.documentElement.clientWidth;
  canvas.height = window.innerHeight || document.clientHeight || document.documentElement.clientHeight;

  canvasHandler = new RainyCanvas(canvas);

  function draw() {
    canvasHandler.drawInCanvas(canvas, ctx);
    requestAnimationFrame(draw)
  }

  draw();
})();