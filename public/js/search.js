(function () {
  const input = document.getElementById('search-input');
  const resultsList = document.getElementById('results-list');
  const resultPanel = document.getElementById('result-panel');
  const resultTitle = document.getElementById('result-title');
  const resultText = document.getElementById('result-text');
  const copyBtn = document.getElementById('copy-btn');
  const emptyState = document.getElementById('empty-state');

  let debounceTimer = null;

  function clearResults() {
    resultsList.innerHTML = '';
  }

  async function runSearch(query) {
    if (query.trim().length < 2) {
      clearResults();
      emptyState.hidden = false;
      emptyState.textContent = 'Digite ao menos 2 letras para buscar um curso.';
      return;
    }
    emptyState.hidden = true;
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const items = await res.json();
    clearResults();
    if (items.length === 0) {
      emptyState.hidden = false;
      emptyState.textContent = 'Nenhum curso encontrado com esse termo.';
      return;
    }
    for (const item of items) {
      const li = document.createElement('li');
      li.textContent = item.label;
      li.addEventListener('click', () => selectCourse(item));
      resultsList.appendChild(li);
    }
  }

  async function selectCourse(item) {
    const res = await fetch(`/api/generate-text?courseId=${item.courseId}&campaignId=${item.campaignId}`);
    if (!res.ok) return;
    const data = await res.json();
    resultTitle.textContent = item.label;
    resultText.textContent = data.text;
    resultPanel.hidden = false;
    copyBtn.textContent = '📋 Copiar texto';
    copyBtn.classList.remove('copied');
    resultPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    const value = input.value;
    debounceTimer = setTimeout(() => runSearch(value), 250);
  });

  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(resultText.textContent);
      copyBtn.textContent = '✅ Copiado!';
      copyBtn.classList.add('copied');
      setTimeout(() => {
        copyBtn.textContent = '📋 Copiar texto';
        copyBtn.classList.remove('copied');
      }, 1500);
    } catch (err) {
      alert('Não foi possível copiar automaticamente. Selecione o texto manualmente.');
    }
  });
})();
