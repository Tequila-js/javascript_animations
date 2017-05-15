import $ from 'jquery';
import reveal from 'reveal';

import {revealDefaults} from './defaults';
import {displayTitle, displayContent, animateGlasses,
  animateSocialMedia, animateCharacter} from './animations';

function showContent($element, current = 0) {
  let [title, content] = [$element.find('h1 span').toArray(), $element.find('.content').toArray()];

  displayTitle(title);
  displayContent(content);

  if ([1, 2].indexOf(current) > -1) {
    animateGlasses($element.find('.glasses').toArray());
    animateSocialMedia($element.find('.social-media').toArray());
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
