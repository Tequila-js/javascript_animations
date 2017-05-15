import anime from 'animejs';

import {animationDefaults} from '../defaults';
import {getWindowWidth, generateRandom} from '../utilities';

const glassesDefaults = {
  opacity: 1,
  left: '21%',
  top: ['0%', '10%', '20%', '39%'],
  rotate: '4turn',
  delay: 2000
}

export default function animateGlasses(elements = [], animationTime = 350) {
  if (!(elements instanceof Array) && !elements.length) {
    return;
  }

  elements.forEach(function (element) {
    let style = element.style,
      config = {};

    [style.opacity, style.top, style.transform] = [0, 0, ''];

    config = {
      targets: element,
      duration: animationTime * 4
    };

    anime(Object.assign({}, config, glassesDefaults, animationDefaults));
  });
}; 