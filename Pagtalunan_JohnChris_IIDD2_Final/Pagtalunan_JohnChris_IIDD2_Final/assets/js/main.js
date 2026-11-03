// Dark mode toggle (remembers the choice) and active nav link.
const root = document.documentElement, btn = document.getElementById('theme');
function setTheme(t){ root.dataset.theme = t; btn.setAttribute('aria-pressed', t === 'dark'); try{ localStorage.setItem('theme', t); }catch(e){} }
let saved = null; try{ saved = localStorage.getItem('theme'); }catch(e){}
if (saved) setTheme(saved);
btn.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

const links = [...document.querySelectorAll('.side nav a')];
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(l => l.toggleAttribute('aria-current', l.getAttribute('href') === '#' + e.target.id));
}), { rootMargin: '-35% 0px -55% 0px' });
document.querySelectorAll('.card[id]').forEach(s => io.observe(s));
document.querySelector('.head').id = 'home-top';
io.observe(document.getElementById('home-top'));
links[0].setAttribute('href', '#home-top');
