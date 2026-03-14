/* ── DROPDOWN ── */
const toggle = document.getElementById('menu-toggle');
const dropdown = document.getElementById('dropdown');
const menuIcon = document.getElementById('menu-icon');
const blurpad = document.getElementById('blurpad');
let open = false;

toggle.addEventListener('click', () => {
  open = !open;
  
  if (open) {
    dropdown.style.display = 'block';
    requestAnimationFrame(() => dropdown.classList.add('open'));
    
    blurpad.classList.remove('opacity-0', 'pointer-events-none');
    blurpad.classList.add('opacity-100');
    
    menuIcon.className = 'bi bi-x-lg text-3xl hover:text-brand-300 transition-colors pr-1';
    
  } else {
    dropdown.classList.remove('open');
    dropdown.style.opacity = '0';
    
    blurpad.classList.remove('opacity-100');
    blurpad.classList.add('opacity-0', 'pointer-events-none'); // fix: restore pointer-events-none
    
    menuIcon.className = 'bi bi-list text-4xl hover:text-brand-300 transition-colors';
    
    setTimeout(() => { dropdown.style.display = 'none'; }, 250);
  }
});

