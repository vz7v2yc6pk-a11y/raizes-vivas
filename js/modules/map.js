const renderRootContent = (rootId) => {
  const rootData = ROOT_CONTENT[rootId];
  const contentTitle = document.getElementById('contentTitle');
  const contentMain = document.getElementById('contentMain');
  const nextBtn = document.getElementById('nextContentBtn');

  if (!rootData || !contentTitle || !contentMain || !nextBtn) return;

  let stepIndex = state.currentStep || 0;
  const section = rootData.sections[stepIndex];

  contentTitle.textContent = `${rootData.title}`;
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

  const isLastStep = stepIndex >= rootData.sections.length - 1;
  nextBtn.textContent = isLastStep ? 'Voltar à árvore' : 'Próximo';
};

const advanceRootContent = () => {
  const rootId = state.currentRoot;
  if (!rootId) return;

  const rootData = ROOT_CONTENT[rootId];
  if (!rootData) return;

  const lastIndex = rootData.sections.length - 1;
  if (!state.currentStep) state.currentStep = 0;

  if (state.currentStep < lastIndex) {
    state.currentStep += 1;
    saveState(state);
    renderRootContent(rootId);
    return;
  }

  if (!state.discoveredRoots.includes(rootId)) {
    state.discoveredRoots.push(rootId);
    state.journeyCount = state.discoveredRoots.length;
    state.completed = state.discoveredRoots.length >= Object.keys(ROOT_CONTENT).length;
  }

  saveState(state);
  renderJourney();
  updateJourneySummary();

  state.currentStep = 0;
  saveState(state);
  showScreen('mapScreen');
  setActiveRoot(null);
};

window.addEventListener('DOMContentLoaded', () => {
  const nextContentBtn = document.getElementById('nextContentBtn');
  if (nextContentBtn) {
    nextContentBtn.addEventListener('click', advanceRootContent);
  }

  const mapJourneyBtn = document.getElementById('mapJourneyBtn');
  if (mapJourneyBtn) {
    mapJourneyBtn.addEventListener('click', () => {
      showScreen('journeyScreen');
      renderJourney();
    });
  }

  const backFromContent = document.getElementById('backFromContent');
  if (backFromContent) {
    backFromContent.addEventListener('click', () => {
      state.currentRoot = null;
      state.currentStep = 0;
      saveState(state);
      showScreen('mapScreen');
      setActiveRoot(null);
    });
  }

  const backFromJourney = document.getElementById('backFromJourney');
  if (backFromJourney) {
    backFromJourney.addEventListener('click', () => showScreen('mapScreen'));
  }

  const backFromAbout = document.getElementById('backFromAbout');
  if (backFromAbout) {
    backFromAbout.addEventListener('click', () => showScreen('mapScreen'));
  }

  const restartBtn = document.getElementById('restartBtn');
  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      const fresh = resetJourney();
      Object.assign(state, fresh);
      showScreen('homeScreen');
      renderCharacters();
      renderJourney();
      updateJourneySummary();
    });
  }

  const journeyBtn = document.getElementById('mapJourneyBtn');
  if (journeyBtn) {
    journeyBtn.addEventListener('click', () => {
      renderJourney();
      showScreen('journeyScreen');
    });
  }
});
