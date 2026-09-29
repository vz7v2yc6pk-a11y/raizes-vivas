const renderCharacters = (selectedId = null) => {
  const grid = document.getElementById('charactersGrid');
  if (!grid) return;

  grid.innerHTML = CHARACTERS.map((character) => `
    <button class="character-card ${selectedId === character.id ? 'selected' : ''}" data-character-id="${character.id}" type="button">
      <div class="character-avatar">${character.avatar}</div>
      <h3>${character.name}</h3>
      <p>${character.description}</p>
    </button>
  `).join('');

  grid.querySelectorAll('.character-card').forEach((card) => {
    card.addEventListener('click', () => {
      const id = card.dataset.characterId;
      state.characterId = id;
      saveState(state);
      renderCharacters(id);
      showScreen('mapScreen');
      renderJourney();
    });
  });
};

window.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('startBtn');
  const backFromGuardian = document.getElementById('backFromGuardian');
  const continueFromGuardian = document.getElementById('continueFromGuardian');
  const backFromName = document.getElementById('backFromName');
  const backFromCharacter = document.getElementById('backFromCharacter');

  if (startBtn) {
    startBtn.addEventListener('click', () => showScreen('guardianScreen'));
  }

  if (backFromGuardian) {
    backFromGuardian.addEventListener('click', () => showScreen('homeScreen'));
  }

  if (continueFromGuardian) {
    continueFromGuardian.addEventListener('click', () => showScreen('nameScreen'));
  }

  if (backFromName) {
    backFromName.addEventListener('click', () => showScreen('guardianScreen'));
  }

  if (backFromCharacter) {
    backFromCharacter.addEventListener('click', () => showScreen('nameScreen'));
  }

  const nameForm = document.getElementById('nameForm');
  if (nameForm) {
    nameForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const nameInput = document.getElementById('userName');
      const nicknameInput = document.getElementById('userNickname');
      
      if (!nameInput.value.trim()) {
        alert('Por favor, digite seu nome.');
        return;
      }
      
      state.name = nameInput.value.trim();
      state.nickname = nicknameInput.value.trim();
      saveState(state);
      renderCharacters(state.characterId);
      showScreen('characterScreen');
    });
  }

  renderCharacters(state.characterId);
});
