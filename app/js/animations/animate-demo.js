import anime from 'animejs';

import {animationDefaults} from '../defaults';

let headerAnimation = anime.timeline(Object.assign({}, animationDefaults, {
  direction: 'alternate',
  loop: true,
  easing: 'easeInOutSine'
})),
  rect = document.querySelectorAll('#svg rect'),
  lines = document.querySelectorAll('#svg .line'),
  figures = document.querySelectorAll('#svg .figures');

headerAnimation
  .add({
    targets: lines,
    strokeDashoffset: [anime.setDashoffset, 0],
    delay: 500,
    duration: 3000
  })
  .add({
    targets: figures,
    fill: ['#F7DF1E', '#FFF'],
    strokeDashoffset: [anime.setDashoffset, 0],
    duration: 3000
  });

const animateDemo = {
  play: headerAnimation.play,
  pause: headerAnimation.pause,
  reverse: headerAnimation.reverse
};

export default animateDemo;