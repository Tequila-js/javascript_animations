export function getWindowWidth() {
  return window.innerWidth || (document.documentElement || document.getElementsByTagName('body')[0]).clientWidth;
}

export function generateRandom(limit = 1) {
  let number = Math.random() * limit;
  return (Math.random() * 10 > 5)? -number : number;
}