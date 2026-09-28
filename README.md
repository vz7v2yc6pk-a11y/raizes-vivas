window.addEventListener('DOMContentLoaded', () => {
  const initialScreen = 'homeScreen';
  showScreen(initialScreen);

  const userNameInput = document.getElementById('userName');
  const userNicknameInput = document.getElementById('userNickname');

  if (userNameInput) {
    userNameInput.value = state.name || '';
  }

  if (userNicknameInput) {
    userNicknameInput.value = state.nickname || '';
  }

  renderCharacters(state.characterId);
  renderJourney();
  updateJourneySummary();

  const finalScreen = document.getElementById('finalScreen');
  if (finalScreen) {
    const journeyButton = document.getElementById('mapJourneyBtn');
    if (journeyButton) {
      journeyButton.addEventListener('click', () => {
        if (state.discoveredRoots.length >= Object.keys(ROOT_CONTENT).length) {
          showScreen('finalScreen');
          updateJourneySummary();
        } else {
          showScreen('journeyScreen');
          renderJourney();
        }
      });
    }
  }

  const aboutButton = document.getElementById('mapMenuBtn');
  if (aboutButton) {
    aboutButton.addEventListener('click', () => showScreen('aboutScreen'));
  }

  const finalBtn = document.getElementById('restartBtn');
  if (finalBtn) {
    finalBtn.addEventListener('click', () => {
      const fresh = resetJourney();
      Object.assign(state, fresh);
      showScreen('homeScreen');
      renderCharacters();
      renderJourney();
      updateJourneySummary();
    });
  }

  const journeyShowFinal = document.getElementById('journeyContent');
  if (journeyShowFinal && state.discoveredRoots.length >= Object.keys(ROOT_CONTENT).length) {
    const finalAction = document.createElement('button');
    finalAction.type = 'button';
    finalAction.className = 'btn btn-primary';
    finalAction.textContent = 'Concluir Jornada';
    finalAction.addEventListener('click', () => {
      showScreen('finalScreen');
      updateJourneySummary();
    });
    journeyShowFinal.appendChild(finalAction);
  }
});
