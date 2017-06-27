window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                               window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
window.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame ||
                              window.webkitCancelAnimationFrame || window.msCancelAnimationFrame;

function getMaxValues () {
  return {
    maxWidth: window.innerWidth || (document.documentElement || document).clientWidth,
    maxHeight: window.innerHeight || (document.documentElement || document).clientHeight
  };
}

function returnRandomColor() {
  return `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(Math.random() * 255)}, ${Math.ceil(Math.random() * 255)})`;
}

function drawLinesBewteenDots(context, dotsArray, toleranceRange) {
  for (let outer = dotsArray.length - 1; outer >= 0; outer--) {
    for (let inner = outer - 1; inner >= 0; inner--) {
      let [iDot, oDot] = [dotsArray[inner], dotsArray[outer]],
        [coorsI, coorsO] = [iDot.getCoors(), oDot.getCoors()],
        isToleratedRange = Math.sqrt(Math.pow(coorsI.x - coorsO.x, 2) + Math.pow(coorsI.y - coorsO.y, 2)) <= toleranceRange;

      if (!isToleratedRange) {
        continue;
      }

      context.beginPath();
      context.strokeStyle = returnRandomColor();
      context.moveTo(coorsI.x, coorsI.y);
      context.lineTo(coorsO.x, coorsO.y);
      context.stroke();
      context.closePath();
    }
  }
}

class Dot {
  constructor({maxWidth = 50, maxHeight = 50} = {}) {
    [this.x, this.y] = [Math.random() * maxWidth, Math.random() * maxHeight];
  }

  setNewMaxValues({maxWidth = 50, maxHeight = 50} = {}) {
    [this.x, this.y] = [Math.random() * maxWidth, Math.random() * maxHeight];
  }

  getCoors() {
    return {x: this.x, y: this.y};
  }

  moveDot() {
    this.x = this.x + (Math.random() > 0.5 ? -5 : 5);
    this.y = this.y + (Math.random() > 0.5 ? -5 : 5);
  }

  draw(context) {
    if (!context) {
      return;
    }

    context.beginPath();
    context.fillStyle = returnRandomColor();
    context.arc(this.x, this.y, 0.25, 0, Math.PI * 1);
    context.fill();
  }
}

(function initDemo01() {
  let canvas = document.querySelector('canvas'),
    context = canvas.getContext('2d'),
    [maxWidth, maxHeight, timerHandler, tolerance] = [0, 0, null, (Math.random() * 100) + 50],
    dots = [...Array(Math.ceil(Math.random() * 500) + 300)];

  context.lineWidth = 1;

  ({maxWidth, maxHeight} = getMaxValues());

  [canvas.width, canvas.height] = [maxWidth, maxHeight];
  dots = dots.map(() => new Dot({maxWidth, maxHeight}));


  function changeBackground() {
    document.body.style.background = Math.random() > 0.5 ? 'black' : 'white';

    setTimeout(changeBackground, 2000);
  }

  function animateDemo() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    dots.forEach(item => (item.moveDot(), item.draw(context)));
    drawLinesBewteenDots(context, dots, tolerance);

    requestAnimationFrame(animateDemo);
  }

  requestAnimationFrame(animateDemo);
  requestAnimationFrame(changeBackground);

  window.addEventListener('resize', () => {
    clearTimeout(timerHandler);
    timerHandler = setTimeout(() => {
      ({maxWidth, maxHeight} = getMaxValues());
      dots.forEach(item => item.setNewMaxValues({maxWidth, maxHeight}));
    }, 60);
  });

  console.log('%cNumero de puntos%c: ' + dots.length, 'color: red; font-weight: bold;', 'color: blue; font-weight: normal;');
}());
