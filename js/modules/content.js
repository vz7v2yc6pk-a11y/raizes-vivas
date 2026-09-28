if (typeof renderRootContent === 'undefined') {
  const renderRootContent = (rootId) => {
    const rootData = ROOT_CONTENT[rootId];
    const contentTitle = document.getElementById('contentTitle');
    const contentMain = document.getElementById('contentMain');
    const nextBtn = document.getElementById('nextContentBtn');

    if (!rootData || !contentTitle || !contentMain || !nextBtn) return;

    const stepIndex = (window.__raizesState && window.__raizesState.currentStep) || 0;
    const section = rootData.sections[stepIndex];

    if (!section) return;

    contentTitle.textContent = rootData.title;
    contentMain.innerHTML = `
      <div class="content-card">
        <span class="content-badge">${rootData.badge}</span>
        <h2>${section.title}</h2>
        <h3>${rootData.person}</h3>
        <p>${section.text}</p>
        ${section.bullets ? `<ul>${section.bullets.map((item) => `<li>${item}</li>`).join('')}</ul>` : ''}
        ${section.task ? `<div class="challenge-box"><strong>Desafio:</strong> ${section.task}</div>` : ''}
      </div>
    `;

    nextBtn.textContent = stepIndex >= rootData.sections.length - 1 ? 'Voltar à árvore' : 'Próximo';
  };
}

if (typeof advanceRootContent === 'undefined') {
  const advanceRootContent = () => {
    const rootId = (window.__raizesState && window.__raizesState.currentRoot) || null;
    const rootData = rootId ? ROOT_CONTENT[rootId] : null;

    if (!rootData) return;

    const lastIndex = rootData.sections.length - 1;
    const currentStep = (window.__raizesState && window.__raizesState.currentStep) || 0;

    if (currentStep < lastIndex) {
      window.__raizesState.currentStep = currentStep + 1;
      renderRootContent(rootId);
      return;
    }

    if (!state.discoveredRoots.includes(rootId)) {
      state.discoveredRoots.push(rootId);
    }

    state.currentRoot = null;
    state.currentStep = 0;
    saveState(state);
    renderJourney();
    updateJourneySummary();
    showScreen('mapScreen');
    setActiveRoot(null);
  };
}
