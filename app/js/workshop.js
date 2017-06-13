import anime from 'animejs';

let lines = document.querySelectorAll('.line'),
  characters = document.querySelectorAll('.character'),
  workshopExample = anime.timeline({
    direction: 'alternate',
    loop: true,
    easing: 'easeInOutSine'
  });

const colors = {
  white: '#FFF',
  black: '#000',
  gray: '#464547',
  blue: '#39c2d7',
  transparent: 'transparent'
},
times = {
  short: 500,
  medium: 1000,
  large: 2000
};

workshopExample
  .add({
    targets: document.body,
    backgroundColor: '#FFFFFF',
    duration: times.medium
  })
  .add({
    targets: lines,
    opacity: [0, 1],
    strokeDashoffset: [anime.setDashoffset, 0],
    strokeDasharray: [anime.setDashoffset, 0],
    stroke: [colors.white, colors.black],
    duration: times.large
  })
  .add({
    targets: lines,
    strokeDashoffset: [anime.setDashoffset, 0],
    stroke: [colors.black, colors.blue],
    duration: times.medium
  })
  .add({
    targets: lines,
    fill: [colors.white, colors.blue],
    duration: times.medium
  })
  .add({
    targets: characters,
    strokeDashoffset: [anime.setDashoffset, 0],
    strokeDasharray: [anime.setDashoffset, 0],
    stroke: [colors.white, colors.gray],
    duration: 500
  });


Array.from(characters).forEach(item => {
  workshopExample
    .add({
      targets: item,
      fill: [colors.white, colors.gray],
      duration: times.medium
    });
});

workshopExample
  .add({
    targets: document.body,
    backgroundColor: [colors.white, colors.gray],
    duration: 50
  })
  .add({
    targets: characters,
    stroke: [colors.gray, colors.white],
    fill: [colors.gray, colors.white],
    duration: times.large
  })
  .add({
    targets: document.body,
    backgroundColor: [colors.gray, colors.blue],
    duration: 50
  })
  .add({
    targets: characters,
    strokeDashoffset: [anime.setDashoffset, 0],
    strokeDasharray: [anime.setDashoffset, 0],
    stroke: [colors.gray, colors.white],
    fill: [colors.gray, colors.blue],
    duration: times.medium
  });

workshopExample
  .add({
    targets: lines,
    strokeDashoffset: [anime.setDashoffset, 0],
    strokeDasharray: [anime.setDashoffset, 0],
    stroke: [colors.blue, colors.white],
    duration: times.large
  })
  .add({
      targets: lines,
      fill: [colors.blue, colors.white],
      duration: times.medium
    });

Array.from(characters).forEach(item => {
  workshopExample
    .add({
      targets: item,
      fill: [colors.blue, colors.white],
      duration: times.medium
    });
});