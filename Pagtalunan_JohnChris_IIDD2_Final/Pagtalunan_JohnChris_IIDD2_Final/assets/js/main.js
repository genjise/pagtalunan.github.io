// Dark mode toggle (remembers the choice) and scroll-spy for the nav and tab bar.
const root = document.documentElement, btns = document.querySelectorAll('.tt');
function setTheme(t){ root.dataset.theme = t; btns.forEach(b => b.setAttribute('aria-pressed', t === 'dark')); try{ localStorage.setItem('theme', t); }catch(e){} }
let saved = null; try{ saved = localStorage.getItem('theme'); }catch(e){}
if (saved) setTheme(saved);
btns.forEach(b => b.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark')));

const links = [...document.querySelectorAll('.side nav a, .tabs a:not(.fab)')];
const ids = [...new Set(links.map(l => l.getAttribute('href').slice(1)).concat('contact'))];
let lock = 0, ticking = false;
function mark(id){ links.forEach(l => l.toggleAttribute('aria-current', l.getAttribute('href') === '#' + id)); }
function spy(){
  ticking = false;
  if (Date.now() < lock) return;               // ignore while a tap is still scrolling
  const line = innerHeight * 0.4; let cur = ids[0], best = -Infinity;
  ids.forEach(id => { const el = document.getElementById(id); if (!el) return;
    const t = el.getBoundingClientRect().top; if (t <= line && t > best){ best = t; cur = id; } });
  if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) cur = 'contact';
  mark(cur);
}
addEventListener('scroll', () => { if (!ticking){ ticking = true; requestAnimationFrame(spy); } }, { passive: true });
document.querySelectorAll('.side nav a, .tabs a').forEach(a => a.addEventListener('click', () => { mark(a.getAttribute('href').slice(1)); lock = Date.now() + 900; }));
spy();
