import $ from 'jquery';
import reveal from 'reveal';
import anime from 'animejs';

const [animationTime] = [750];

const defaults = {
  loop: false,
  direction: 'alternate',
  elasticity: () => 500
};

function getWindowWidth() {
  return window.innerWidth || (document.documentElement || document.getElementsByTagName('body')[0]).clientWidth;
}

(function ready(window, document) {
  let $containers = Array.from(document.querySelectorAll('.slides > section')).map(item => $(item)),
    hash = location.hash.replace('#/', ''),
    [current, numberOfSlides] = [!hash ? 0 : parseInt(hash, 10), $containers.length];

  $containers.forEach(function fixTitleFormat($item) {
    let $current = $item.find('.title'),
      text = ($current.text() || '').split('').map(item => `<span>${item === ' ' ? '&nbsp;' : item}</span>`);

    $current.html(text.join(''));
  });

  reveal.initialize({
    width: '100%',
    height: '100%',
    progress: true,
    history: true,
    transition: 'none',
    center: false
  });

  showContent($containers[current]);

  $('.navigate-right').on('click touchstart', nextFn);
  $('.navigate-left').on('click touchstart', prevFn);
  $(document, window).on('keydown', function(e) {
    switch (e.key) {
      case 'ArrowRight':
        nextFn();
      case 'ArrowLeft':
        prevFn();
        break;
      default:
    }
  });

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
}(window, document));

function showContent($element, current = 0) {
  let [title, content] = [$element.find('h1 span').toArray(), $element.find('.content').toArray()];

  if ([1, 2].indexOf(current)) {
    let glasses = $element.find('.content .glasses').toArray();
    animateGlasses(glasses);
  }

  displayTitle(title);
  displayContent(content);
}

function displayTitle (elements = [], time = 200) {
  let [positionWidth, width, availableWidth, yVal, total]= [35, getWindowWidth(), 0, 0, $(window).width()];

  if (!(elements instanceof Array)) return;
  total = $(window).width() / elements.length;

  elements.forEach(function (item, i) {
    let [config, currentVal, animation] = [null, i * total, 2 * i * time];

    config = {
      targets: elements[i],
      left: [
        {value: (Math.random() * 10) > 5? currentVal: -currentVal, duration: 0},
        {value: 0, duration: animationTime * 5},
      ],
      top: [
        {value: (Math.random() * 10) > 5? currentVal: -currentVal, duration: 0},
        {value: 0, duration: animationTime * 5}
      ],
      opacity: [
        {value: 0, duration: 0},
        {value: 1, duration: animationTime * 2}
      ],/*
      color: [
        {value: '#39c2d7', duration: animationTime / 2},
        {value: '#fff', duration: animationTime }
      ],*/
      elasticity: () => 500
    };
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