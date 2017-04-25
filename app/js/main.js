import $ from 'jquery';
import reveal from 'reveal';
import anime from 'animejs';

const timeoutTime = 600;

(function ready(window, document) {
  let [current, numberOfSlides] = [0, document.querySelectorAll('.slides section')],
    titles = ['#first-title span', '#presentation-one span'];
  reveal.initialize();

  setTimeout(function () { showTitle('#first-title span') }, timeoutTime);

  $('.navigate-right').on('click', function () {
    if (current === numberOfSlides.length - 1) return;
    current += 1;
    setTimeout(function () { 
      showTitle(titles[current]);
      hideTitle(titles[current - 1]);
    }, timeoutTime);
  });

  $('.navigate-left').on('click', function () {
    if (current === 0) return;
    current -= 1;
    setTimeout(function () {
      showTitle(titles[current]);
      hideTitle(titles[current + 1]);
    }, timeoutTime);
  });
})(window, document);

function showTitle(title = '') {
  const [time, positionWidth, elements] = [200, 13, document.querySelectorAll(title)];
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
      elasticity: (el, i, l) => 800000
    });
  }
}

function hideTitle(title = '') {
  const [time, positionWidth, elements] = [200, 13, document.querySelectorAll(title)];
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
      elasticity: (el, i, l) => 800000
    });
  }
}