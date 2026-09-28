const renderJourney = () => {
  const journeyContent = document.getElementById('journeyContent');
  if (!journeyContent) return;

  const discovered = state.discoveredRoots;

  if (!discovered.length) {
    journeyContent.innerHTML = '<div class="empty-state">Ainda não há descobertas nesta jornada. Explore uma raiz para começar.</div>';
    return;
  }

  const cards = discovered.map((rootId) => {
    const rootData = ROOT_CONTENT[rootId];
    return `
      <div class="journey-card">
        <h3>${rootData.title}</h3>
        <p>${rootData.discovery}</p>
      </div>
    `;
  }).join('');

  const finalAction = state.discoveredRoots.length >= Object.keys(ROOT_CONTENT).length
    ? `<button id="finalJourneyBtn" class="btn btn-primary" type="button">Concluir Jornada</button>`
    : '';

  journeyContent.innerHTML = `
    <div class="journey-grid">
      ${cards}
    </div>
    ${finalAction}
  `;

  const finalJourneyBtn = document.getElementById('finalJourneyBtn');
  if (finalJourneyBtn) {
    finalJourneyBtn.addEventListener('click', () => {
      showScreen('finalScreen');
      updateJourneySummary();
    });
  }
};

const updateJourneySummary = () => {
  const summary = document.getElementById('finalSummary');
  if (!summary) return;

  const rootCards = state.discoveredRoots.map((rootId) => {
    const rootData = ROOT_CONTENT[rootId];
    return `<div class="summary-pill">${rootData.title} · ${rootData.person}</div>`;
  }).join('');

  summary.innerHTML = `
    <div class="summary-pill"><strong>Explorador:</strong> ${formatUserLabel(state)}</div>
    <div class="summary-pill"><strong>Personagem:</strong> ${CHARACTERS.find((char) => char.id === state.characterId)?.name || 'Não definido'}</div>
    <div class="summary-pill"><strong>Raízes exploradas:</strong> ${state.discoveredRoots.length}</div>
    ${rootCards || '<div class="summary-pill">Nenhuma descoberta ainda.</div>'}
  `;
};
