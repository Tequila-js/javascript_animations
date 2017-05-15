import anime from 'animejs';

import {animationDefaults} from '../defaults';
import {getWindowWidth, generateRandom} from '../utilities';

export default function displayTitle(elements = [], animationTime = 350) {
  if (!(elements instanceof Array) && !elements.length) {
    return;
  }
  let [widthLimit, total] = [getWindowWidth(), elements.length];

  elements.forEach(function (element, i) {
    element.style.opacity = 0;
    let duration = (i + .5) * animationTime,
      config = {
        targets: element,
        left: [
          {value: generateRandom(widthLimit)},
          {value: 0}
        ],
        top: [
          {value: generateRandom(widthLimit)},
          {value: 0}
        ],
        rotate: [
          {value: generateRandom(widthLimit)},
          {value: 0}
        ],
        scale: [
          {value: Math.abs(generateRandom(5))},
          {value: 1}
        ],
        opacity: [{value: 0}, {value: 1}],
        duration
      };

      anime(Object.assign({}, config, animationDefaults));
    });
}