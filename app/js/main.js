import $ from 'jquery';
import reveal from 'reveal';
import anime from 'animejs';

import {revealDefaults} from './defaults';
import {getWindowWidth, generateRandom} from './utilities';
import {displayTitle, displayContent, animateGlasses,
  animateSocialMedia, animateCharacter, animateDemo} from './animations';

function showContent($element, current = 0) {
  let [title, content] = [$element.find('h1 span').toArray(), $element.find('.content').toArray()];

  displayTitle(title);
  displayContent(content);

  switch (current) {
    case 1:
    case 2:
      animateGlasses($element.find('.glasses').toArray());
      animateSocialMedia($element.find('.social-media').toArray());
      break;
    case 9:
      animateDemo.play();
      break;
    case 8:
    case 10:
      animateDemo.pause();
      break;
    default:
  }
}

(function ready(window, document) {
  let $containers = Array.from(document.querySelectorAll('.slides > section')).map(item => $(item)),
    hash = location.hash.replace('#/', ''),
    [current, numberOfSlides] = [!hash ? 0 : +hash, $containers.length];

  $containers.forEach(function fixTitleFormat($item) {
    Array.from($item.find('.title')).forEach(title => {
      let text = !title.innerText ? '' : title.innerText.split('').map(item => `<span>${item === ' ' ? '&nbsp;' : item}</span>`).join('');
      title.innerHTML = text;
    });
  });

  reveal.initialize(revealDefaults);
  animateCharacter();

  showContent($containers[current], current);

  function nextFn () {
    if (current === numberOfSlides - 1) {
      return;
    }

    current += 1;
    showContent($containers[current], current);
  }

  function prevFn () {
    if (current === 0) {
      return;
    }

    current -= 1;
    showContent($containers[current], current);
  }

  $('.navigate-right').on('click touchstart', nextFn);
  $('.navigate-left').on('click touchstart', prevFn);
  $(document, window).on('keydown', function(e) {
    switch (e.key) {
      case 'ArrowRight':
        nextFn();
        break;
      case 'ArrowLeft':
        prevFn();
        break;
      default:
    }
  });

}(window, document));

(function generateRandomDemo() {
  function animationGenerator (element) {
    let width = getWindowWidth() / 10;
    anime({
      targets: element,
      translateX: [...Array(Math.ceil(Math.random() * 10) + 5)].map(() => generateRandom(width)),
      translateY: [...Array(Math.ceil(Math.random() * 10) + 5)].map(() => generateRandom(width)),
      background: [...Array(Math.ceil(Math.random() * 10) + 5)].map(() => `#${(Math.ceil(Math.random() * 16777215)).toString(16).toUpperCase()}`),
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
      elasticity: () => 300,
      duration: Math.ceil(Math.random() * 10000)
    });
  }

  let elements = Array(Math.ceil(Math.random() * 100) + 20).fill('<div class="animation-demo" />');

  $('#generated-example').html(elements.join(''));

  Array.from(document.querySelectorAll('#generated-example .animation-demo'))
    .forEach(item => animationGenerator(item));

})();
