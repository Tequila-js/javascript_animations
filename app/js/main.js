import $ from 'jquery';
import reveal from 'reveal';
import anime from 'animejs';

const timeoutTime = 600;

(function ready(window, document) {
  {
  let containers = document.querySelectorAll('.slides > section'),
    titles = ['Animations', 'Marco Dmz', 'Carlos Perez', 'Carlos Perez 1', 'Carlos Perez 2'];

    for (let i = 0, size =  containers.length; i < size; i += 1) {
      let $container = $(containers[i]),
        [title, titleDOM] = [titles[i].split(''), []];

        titleDOM = title.map(item => `<span>${item}</span>`);

      $container.find('.title').html(titleDOM.join(''));
    }
  }

  let [current, numberOfSlides] = [0, document.querySelectorAll('.slides section')],
    containers = ['#first-title', '#presentation-one', '#presentation-two'];
  reveal.initialize({
    width: "100%",
    height: "100%",
    progress: true,
    transition: 'none',
    center: false,
    keyboard: false
  });

  setTimeout(function () { showTitle('#first-title') }, timeoutTime);

  $('.navigate-right').on('click touchstart',nextFn);
  $('.navigate-left').on('click touchstart', prevFn);

  function nextFn () {
    if (current === numberOfSlides.length - 1) return;
    current += 1;
    setTimeout(function () {
     showTitle(containers[current]);
     showContent(containers[current]);
     //hideTitle(containers[current - 1]);
     //hideContent(containers[current - 1]);
    }, timeoutTime);
  }

  function prevFn () {
    if (current === 0) return;
    current -= 1;
    setTimeout(function () {
      showTitle(containers[current]);
      showContent(containers[current]);
      hideTitle(containers[current + 1]);
      hideContent(containers[current + 1]);
    }, timeoutTime);
  }
})(window, document);
/* Content */
function showContent(container = '') {
  const [time, element] = [200, document.querySelectorAll(`${container} .content`)];
  if (!element) return;
  anime({
    targets: element,
    opacity: 1,
    translateX: [
      {value: (window.innerWidth || (document.documentElement  || document.getElementsByTagName('body')[0]).clientWidth), duration: 0},
      {value: 0, duration: 1500}
    ],
    duration: 1500,
    delay: 0
  })
}

function hideContent(container = '') {
  const element = document.querySelectorAll(`${container} .content`);
  if (!element) return;
  anime({
    targets: element,
    opacity: 0
  })
}
/* Titles */
function showTitle(container = '') {
  const [time, positionWidth, elements] = [200, 13, document.querySelectorAll(`${container} .title span`)];
  if (!elements.length) return;
  for (let i = 0, size = elements.length; i < size; i++) {
    anime({
      targets: elements[i],
      translateX: (i * positionWidth),
      color: [
        {value: 'transparent'},
        {value: '#FFF'},
        {value: '#39c2d7'}
      ],
      opacity: 1,
      direction: 'alternate',
      loop: false,
      delay: () => (i * time),
      elasticity: () => 800
    });
  }
}

function hideTitle(container = '') {
  const [time, positionWidth, elements] = [200, 13, document.querySelectorAll(`${container} .title span`)];
  if (!elements.length) return;
  for (let i = 0, size = elements.length; i < size; i++) {
    anime({
      targets: elements[i],
      translateX: (0),
      color: [
        {value: 'transparent'}
      ],
      opacity: 0,
      direction: 'alternate',
      loop: false,
      elasticity: () => 800
    });
  }
}
