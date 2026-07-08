(function () {
  const toggleBtn = document.getElementById('chat-toggle');
  const closeBtn = document.getElementById('chat-close');
  const panel = document.getElementById('chat-panel');
  const messagesEl = document.getElementById('chat-messages');
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');

  const history = [];

  function addMessage(role, text) {
    const div = document.createElement('div');
    div.className = `chat-msg chat-msg-${role}`;
    div.textContent = text;
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return div;
  }

  toggleBtn.addEventListener('click', () => {
    panel.hidden = !panel.hidden;
    if (!panel.hidden) input.focus();
  });
  closeBtn.addEventListener('click', () => { panel.hidden = true; });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = input.value.trim();
    if (!message) return;
    input.value = '';
    addMessage('user', message);
    const loadingEl = addMessage('assistant', 'Buscando...');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, history }),
      });
      const data = await res.json();
      if (!res.ok) {
        loadingEl.className = 'chat-msg chat-msg-error';
        loadingEl.textContent = data.error || 'Erro ao consultar o assistente.';
        return;
      }
      loadingEl.textContent = data.text;
      history.push({ role: 'user', content: message });
      history.push({ role: 'assistant', content: data.text });
    } catch (err) {
      loadingEl.className = 'chat-msg chat-msg-error';
      loadingEl.textContent = 'Falha de conexão com o servidor.';
    }
  });
})();
