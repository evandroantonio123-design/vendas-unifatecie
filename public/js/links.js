(function () {
  const btn = document.getElementById('links-menu-btn');
  const dropdown = document.getElementById('links-menu-dropdown');
  if (!btn || !dropdown) return;

  let loaded = false;

  async function loadLinks() {
    if (loaded) return;
    try {
      const res = await fetch('/api/links');
      const links = await res.json();
      dropdown.innerHTML = '';
      if (links.length === 0) {
        dropdown.innerHTML = '<div class="links-menu-empty">Nenhum link cadastrado.</div>';
      } else {
        for (const link of links) {
          const a = document.createElement('a');
          a.href = link.url;
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          a.textContent = link.name;
          dropdown.appendChild(a);
        }
      }
      loaded = true;
    } catch (err) {
      dropdown.innerHTML = '<div class="links-menu-empty">Erro ao carregar links.</div>';
    }
  }

  btn.addEventListener('click', async (e) => {
    e.stopPropagation();
    const willOpen = dropdown.hidden;
    dropdown.hidden = !willOpen;
    if (willOpen) await loadLinks();
  });

  document.addEventListener('click', (e) => {
    if (!dropdown.hidden && !dropdown.contains(e.target) && e.target !== btn) {
      dropdown.hidden = true;
    }
  });
})();
