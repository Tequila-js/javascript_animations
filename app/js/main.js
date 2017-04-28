import $ from 'jquery';
import reveal from 'reveal';
import anime from 'animejs';

const timeoutTime = 600;

function  getWindowWidth() {
  return window.innerWidth || (document.documentElement  || document.getElementsByTagName('body')[0]).clientWidth;
}

(function ready(window, document) {
  let $containers = Array.from(document.querySelectorAll('.slides > section')).map(item => $(item)),
    [current, numberOfSlides] = [0, $containers.length];

  $containers.forEach(function fixTitleFormat($item) {
    let $current = $item.find('.title'),
        text = $current.text().split('');

    text = text.map(item => `<span>${item}</span>`);
    $current.html(text.join(''));
  });

  let containers = ['#first-title', '#presentation-one', '#presentation-two'];

  reveal.initialize({
    width: "100%",
    height: "100%",
    progress: true,
    transition: 'none',
    center: false,
    keyboard: false
  });

  setTimeout(function () { showContent($containers[0]); }, timeoutTime);

  $('.navigate-right').on('click touchstart',nextFn);
  $('.navigate-left').on('click touchstart', prevFn);

  function nextFn () {
    if (current === numberOfSlides.length - 1) return;
    hideContent($containers[current]);
    current += 1;
    setTimeout(function () {
      showContent($containers[current]);
    }, timeoutTime);
  }

  function prevFn () {
    if (current === 0) return;
    hideContent($containers[current]);
    current -= 1;
    setTimeout(function () {
      showContent($containers[current]);
    }, timeoutTime);
  }
})(window, document);

function showContent($element) {
  const time = 200;
  let [title, content] = [$element.find('h1 span').toArray(), $element.find('.content').toArray()];

  displayTitle(title);
  displayContent(content);
}

function hideContent($element) {
  const time = 200;
  let [title, content] = [$element.find('h1 span').toArray(), $element.find('.content').toArray()];

  hideTitle(title);
  hideContentContainer(content);
}

function displayTitle (elements = [], time = 200) {
  if (!(elements instanceof Array)) return;

  elements.forEach(function (item, i) {
    const positionWidth = 13;

    anime({
      targets: elements[i],
      translateX: [
        {value: 0, duration: 0},
        {value: i * positionWidth, duration: i * time}
      ],
      translateY: [
        {value: i%2 === 0? -(i * positionWidth): (i * positionWidth), duration: 0},
        {value: 0, duration: i * time}
      ],
      opacity: [
        {value: .5, duration: .5},
        {value: 1, duration: 1}
      ],
      color: [{value: 'transparent'}, {value: '#FFF'}, {value: '#39c2d7'}],
      direction: 'alternate',
      loop: false,
      elasticity: () => 800
    });
  });
}

function displayContent(content = [], time = 200) {
  if (!(content instanceof Array)) return;

  anime({
    targets: content,
    opacity: [
      {value: 0},
      {value: 1, duration: time}
    ],
    translateX: [
      {value: getWindowWidth(), duration: 0},
      {value: 0, duration: 1000}
    ],
    elasticity: () => 800,
    duration: 1000
  });
}

function hideTitle(elements = [], time = 200) {
  if (!(elements instanceof Array)) return;

  elements.forEach(item => item.style.opacity = 0);
}

function hideContentContainer(content = [], time = 200) {
  if (!(content instanceof Array) || !content) return;

  content.forEach(item => item.style.opacity = 0);
}