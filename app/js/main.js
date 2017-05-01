import $ from 'jquery';
import reveal from 'reveal';
import anime from 'animejs';

const [timeoutTime, animationTime] = [600, 750];

const defaults = {
  loop: false,
  direction: 'alternate',
  elasticity: () => 500
};

/* Color Declarations*/
const blue = {
  nullOp: 'rgba(57, 194, 215, 0)',
  middleOp: 'rgba(57, 194, 215, .5)',
  totalOp: 'rgba(57, 194, 215, 1)'
};

function  getWindowWidth() {
  return window.innerWidth || (document.documentElement  || document.getElementsByTagName('body')[0]).clientWidth;
}

(function ready(window, document) {
  let $containers = Array.from(document.querySelectorAll('.slides > section')).map(item => $(item)),
    [current, numberOfSlides] = [0, $containers.length];

  $containers.forEach(function fixTitleFormat($item) {
    let $current = $item.find('.title'),
      text = ($current.text() || '').split('').map(item => `<span>${item}</span>`);

    $current.html(text.join(''));
  });

  reveal.initialize({
    width: "100%",
    height: "100%",
    progress: true,
    transition: 'none',
    center: false,
    keyboard: false
  });

  showContent($containers[0]);

  $('.navigate-right').on('click touchstart', nextFn);
  $('.navigate-left').on('click touchstart', prevFn);

  function nextFn () {
    if (current === numberOfSlides - 1) return;

    current += 1;
    showContent($containers[current], 200, current);
  }

  function prevFn () {
    if (current === 0) return;

    current -= 1;
    showContent($containers[current], 200, current);
  }
})(window, document);

function showContent($element, current = 0) {
  let [title, content, titleSize] = [$element.find('h1 span').toArray(), $element.find('.content').toArray(), 0];

  if ([1, 2].indexOf(current)) {
    let glasses = $element.find('.content .glasses').toArray();
    animateGlasses(glasses);
  }

  titleSize = displayTitle(title) + 65;
  displayContent(content);

  $element.find('h1').height(titleSize);
}

function displayTitle (elements = [], time = 200) {
  let [positionWidth, width, availableWidth, xVal, yVal]= [35, getWindowWidth(), 0, 0, 0];
  availableWidth = width * .25;

  if (!(elements instanceof Array)) return;

  elements.forEach(function (item, i) {
    let [config, yDist] = [null, i * positionWidth * 3];

    config = {
      targets: elements[i],
      left: [
        {value: 0, duration: 0},
        {value: xVal, duration: i * time}
      ],
      translateY: [
        {value: i % 2 === 0? - yDist: yDist, duration: 0},
        {value: yVal, duration: animationTime}
      ],
      opacity: [
        {value: 0, duration: 0},
        {value: 1, duration: animationTime / 2}
      ],
      color: [
        {value: blue.middleOp, duration: animationTime / 2},
        {value: blue.totalOp, duration: animationTime }
      ]
    };

    if (xVal >= availableWidth && item.innerText === '') {
      [xVal, yVal] = [0, yVal + 60];
    } else {
      xVal += item.innerText === ''? 15 : item.offsetWidth;
    }

    anime(Object.assign({}, config, defaults));
  });

  return yVal;
}

function displayContent(content = [], time = 200) {
  if (!(content instanceof Array)) return;
  let width = getWindowWidth() * 1.5;

  content.forEach(function (items, i) {
    let config = {
      targets: content[i],
      opacity: [
        {value: 0, duration: animationTime / 2},
        {value: 1, duration: animationTime}
      ],
      translateX: [
        {value: i % 2? width : - width, duration: 0},
        {value: i % 2? - width : width, duration: animationTime},
        {value: 0, duration: animationTime}
      ]
    };

    anime(Object.assign({}, config, defaults));
  });
}

function  animateGlasses (element) {
  if (!element || !element.length) return;
  element.forEach(item => (item.style.opacity = 0, item.style.top = 0, item.style.transform = ''));

  let config = {
    targets: element,
    opacity: 1,
    left: 46,
    top: [0, 50, 100, 144],
    rotate: '5turn',
    delay: 2000
  };

  anime(Object.assign({}, config, defaults));
}