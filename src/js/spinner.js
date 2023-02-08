import { Spinner } from 'spin.js';

const backdropEl = document.querySelector('.backdrop');

const opts = {
  lines: 12, // The number of lines to draw
  length: 80, // The length of each line
  width: 22, // The line thickness
  radius: 67, // The radius of the inner circle
  scale: 0.75, // Scales overall size of the spinner
  corners: 0.8, // Corner roundness (0..1)
  speed: 1, // Rounds per second
  rotate: 48, // The rotation offset
  animation: 'spinner-line-fade-more', // The CSS animation name for the lines
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#ff6b08', // CSS color or array of colors
  fadeColor: 'transparent', // CSS color or array of colors
  top: '50%', // Top position relative to parent
  left: '50%', // Left position relative to parent
  shadow: '100 10 20px transparent', // Box-shadow for the lines
  zIndex: 2000000000, // The z-index (defaults to 2e9)
  className: 'spinner', // The CSS class to assign to the spinner
  position: 'absolute', // Element positioning
};

const target = document.querySelector('.spinner');
const spinner = new Spinner(opts);

export function spinnerStart() {
  spinner.spin(target);
}

export function spinnerStop() {
  spinner.stop();
  backdropEl.classList.add('is-hidden');
}
