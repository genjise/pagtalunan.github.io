// Dark mode toggle (remembers the choice) and active nav/tab highlight.
const root = document.documentElement, btns = document.querySelectorAll('.tt');
function setTheme(t){ root.dataset.theme = t; btns.forEach(b => b.setAttribute('aria-pressed', t === 'dark')); try{ localStorage.setItem('theme', t); }catch(e){} }
let saved = null; try{ saved = localStorage.getItem('theme'); }catch(e){}
if (saved) setTheme(saved);
btns.forEach(b => b.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark')));

const links = [...document.querySelectorAll('.side nav a, .tabs a:not(.fab)')];
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(l => l.toggleAttribute('aria-current', l.getAttribute('href') === '#' + e.target.id));
}), { rootMargin: '-35% 0px -55% 0px' });
document.querySelectorAll('.card[id], #home-top').forEach(s => io.observe(s));
