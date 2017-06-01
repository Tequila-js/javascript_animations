import anime from 'animejs';

import {animationDefaults} from './defaults';

let workshopExample = anime.timeline(Object.assign({}, animationDefaults, {
    direction: 'alternate',
    loop: true,
    easing: 'easeInOutSine'
  })),
  lines = document.querySelectorAll('.line');

const colors = {
  white: '#FFF',
  black: '#000',
  gray: '#464547',
  blue: '#39c2d7',
  transparent: 'transparent'
};

workshopExample
  .add({
    targets: lines,
    opacity: [0, 1],
    strokeDashoffset: [anime.setDashoffset, 0],
    strokeDasharray: [anime.setDashoffset, 0],
    stroke: [colors.white, colors.black],
    duration: 2000
  })
  .add({
    targets: lines,
    strokeDashoffset: [anime.setDashoffset, 0],
    stroke: [colors.black, colors.blue],
    duration: 2000
  })
  .add({
    targets: lines,
    fill: [colors.white, colors.blue],
    duration: 2000
  });

Array.from(document.querySelectorAll('.character')).forEach(item => {
  workshopExample
    .add({
      targets: item,
      strokeDashoffset: [anime.setDashoffset, 0],
      strokeDasharray: [anime.setDashoffset, 0],
      stroke: [colors.white, colors.gray],
      duration: 500
    })
    .add({
      targets: item,
      fill: [colors.white, colors.gray],
      duration: 500
    });
});
