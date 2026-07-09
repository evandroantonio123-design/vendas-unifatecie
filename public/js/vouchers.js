(function () {
  const panel = document.getElementById('voucher-panel');
  const list = document.getElementById('voucher-list');
  if (!panel || !list) return;

  async function loadVouchers() {
    try {
      const res = await fetch('/api/vouchers');
      const vouchers = await res.json();
      if (vouchers.length === 0) return;

      list.innerHTML = '';
      for (const voucher of vouchers) {
        const row = document.createElement('div');
        row.className = 'voucher-item';
        row.innerHTML = `
          <span class="voucher-name">${voucher.name}</span>
          <code class="voucher-code">${voucher.code}</code>
          <button class="voucher-copy-btn" type="button" title="Copiar código">📋</button>
        `;
        row.querySelector('.voucher-copy-btn').addEventListener('click', async (e) => {
          const btn = e.currentTarget;
          try {
            await navigator.clipboard.writeText(voucher.code);
            btn.textContent = '✅';
            setTimeout(() => (btn.textContent = '📋'), 1200);
          } catch (err) {
            alert('Não foi possível copiar. Código: ' + voucher.code);
          }
        });
        list.appendChild(row);
      }
      panel.hidden = false;
    } catch (err) {
      // silencioso: se der erro, o card simplesmente não aparece
    }
  }

  loadVouchers();
})();
