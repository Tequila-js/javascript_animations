import anime from 'animejs';

import {animationDefaults} from '../defaults';
import {getWindowWidth, generateRandom} from '../utilities';

export default function displayContent(elements = [], animationTime = 350) {
  if (!(elements instanceof Array) && !elements.length) {
    return;
  }

  let [width, duration] = [getWindowWidth() * 3, animationTime * 2];

  elements.forEach(function (element, i) {
    element.style.opacity = 0;
    
    let distance = Math.abs(generateRandom(width)),
      config = {
      targets: element,
      opacity: [
        {value: 0},
        {value: 1, duration: animationTime}
      ],
      translateX: [
        {value: i % 2 === 0 ? distance : -distance, duration: 0},
        {value: i % 2 === 1 ? distance : -distance, duration},
        {value: 0, duration}
      ],
      duration: animationTime * 3
    };

    anime(Object.assign({}, config, animationDefaults));
  });
};