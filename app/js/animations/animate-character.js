import anime from 'animejs';
import $ from 'jquery';

import {animationDefaults} from '../defaults';

const progress = document.querySelector('#js-demo-progress-result'),
  status = document.querySelector('#js-demo-status-result'),
  time = document.querySelector('#js-demo-time-result');

export default function animateCharacter() {
  let settings = {
      targets: document.querySelector('.js-demo .character'),
      translateY: [
        {value: 154},
        {value: 0}
      ],
      run: () => status.innerText = 'Funcionando',
      complete: () => status.innerText = 'No funcionando',
      update: anim => {
        if (!anim.began) {
          status.innerText = 'No funcionando';
          return;
        }

        [progress.innerText, time.innerText] = [`${anim.progress.toFixed(2)}%`, `${(anim.currentTime / 1000).toFixed(2)}s`];
      },
      loop: true,
      autoplay: false,
      duration: 5000
    },
    characterAnimation = anime(Object.assign({}, animationDefaults, settings));

  $('#js-demo-play').on('click', e => (e.preventDefault(), characterAnimation.play()));
  $('#js-demo-reverse').on('click', e => (e.preventDefault(), characterAnimation.reverse()));
  $('#js-demo-pause').on('click', e => (e.preventDefault(), characterAnimation.pause()));
  $('#js-demo-restart').on('click', e => (e.preventDefault(), characterAnimation.restart()));

  document.querySelector('#js-demo-progress').oninput = (e) => characterAnimation.seek(e.target.value || 0);
}
