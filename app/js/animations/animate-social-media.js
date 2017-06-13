import anime from 'animejs';

import {animationDefaults} from '../defaults';

export default function animateSocialMedia(elements = [], animationTime = 350) {
  if (!(elements instanceof Array) && !elements.length) {
    return;
  }

  elements.forEach(e => e.style.opacity = 0);

  let config = {
    targets: elements,
    translateY: [
      {value: -500, duration: 0},
      {value: 0, duration: animationTime * 2}
    ],
    opacity: [
      {value: 1, duration: animationTime}
    ],
    delay: 2000,
    elasticity: () => 1500,
    duration: animationTime * 5
  };

  anime(Object.assign({}, config, animationDefaults));
}
