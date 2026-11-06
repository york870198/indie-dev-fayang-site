// Contents: collapsed bar on phones, always-open rail on desktop. Without JS it stays a working <details>.
const toc = document.querySelector('.toc');
const desktop = matchMedia('screen and (min-width: 64rem)');
const sync = () => { toc.open = desktop.matches; };

sync();
desktop.addEventListener('change', sync);
toc.addEventListener('click', (e) => {
  if (desktop.matches) {
    if (e.target.closest('summary')) e.preventDefault();
  } else if (e.target.closest('a')) {
    toc.open = false; // the open list would cover the section it just jumped to
  }
});
