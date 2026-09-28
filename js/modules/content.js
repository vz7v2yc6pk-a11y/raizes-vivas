if (typeof renderRootContent === 'undefined') {
  const renderRootContent = (rootId, explicitStep = null) => {
    const rootData = ROOT_CONTENT[rootId];
    const contentTitle = document.getElementById('contentTitle');
    const contentMain = document.getElementById('contentMain');
    const nextBtn = document.getElementById('nextContentBtn');

    if (!rootData || !contentTitle || !contentMain || !nextBtn) return;

    const currentStep = explicitStep ?? (state.currentStep ?? 0);
    const section = rootData.sections[currentStep];

    if (!section) return;

    state.currentRoot = rootId;
    state.currentStep = currentStep;
    saveState(state);

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

    nextBtn.textContent = currentStep >= rootData.sections.length - 1 ? 'Voltar à árvore' : 'Próximo';
  };
}

if (typeof advanceRootContent === 'undefined') {
  const advanceRootContent = () => {
    const rootId = state.currentRoot;
    if (!rootId) return;

    const rootData = ROOT_CONTENT[rootId];
    if (!rootData) return;

    const lastIndex = rootData.sections.length - 1;
    const currentStep = state.currentStep ?? 0;

    if (currentStep < lastIndex) {
      state.currentStep = currentStep + 1;
      saveState(state);
      renderRootContent(rootId, state.currentStep);
      return;
    }

    if (!state.discoveredRoots.includes(rootId)) {
      state.discoveredRoots.push(rootId);
      state.journeyCount = state.discoveredRoots.length;
      state.completed = state.discoveredRoots.length >= Object.keys(ROOT_CONTENT).length;
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
