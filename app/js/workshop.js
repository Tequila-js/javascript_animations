import anime from 'animejs';

let lines = document.querySelectorAll('.line'),
  characters = document.querySelectorAll('.character'),
  workshop = anime.timeline({
    direction: 'alternate',
    loop: true,
    easing: 'easeInOutSine'
  });

const color = {
    white: '#FFF',
    black: '#000',
    gray: '#464547',
    blue: '#39c2d7',
    transparent: 'transparent'
  },
  times = {
    short: 500,
    medium: 1000,
    large: 2500
  };

workshop
  .add({
    targets: document.body,
    background: color.white,
    duration: times.medium
  })
  .add({
    targets: lines,
    opacity: [0, 1],
    strokeDashoffset: [anime.setDashoffset, 0],
    strokeDasharray: [anime.setDashoffset, 0],
    stroke: [color.white, color.black],
    duration: times.large
  })
  .add({
    targets: lines,
    opacity: [0, 1],
    strokeDashoffset: [anime.setDashoffset, 0],
    stroke: [color.black, color.blue],
    duration: times.medium
  })
  .add({
    targets: lines,
    fill: [color.white, color.blue],
    duration: times.medium
  })
  .add({
    targets: characters,
    strokeDashoffset: [anime.setDashoffset, 0],
    strokeDasharray: [anime.setDashoffset, 0],
    stroke: [color.white, color.gray],
    duration: times.short
  });

Array.from(characters).forEach(item => {
  workshop.add({
    targets: item,
    fill: [color.white, color.gray],
    duration: times.medium
  });
});
