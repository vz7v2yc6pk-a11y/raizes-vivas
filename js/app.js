window.addEventListener('DOMContentLoaded', () => {
  const mapScreen = document.getElementById('mapScreen');
  if (!mapScreen) return;

  const rootGroups = document.querySelectorAll('.root-group');
  rootGroups.forEach((group) => {
    group.addEventListener('click', () => {
      const rootId = group.dataset.root;
      state.currentRoot = rootId;
      state.currentStep = 0;
      saveState(state);
      setActiveRoot(rootId);
      showScreen('contentScreen');
      renderRootContent(rootId, 0);
    });
  });

  const mapMenuBtn = document.getElementById('mapMenuBtn');
  if (mapMenuBtn) {
    mapMenuBtn.addEventListener('click', () => {
      showScreen('aboutScreen');
    });
  }

  const journeyButton = document.getElementById('mapJourneyBtn');
  if (journeyButton) {
    journeyButton.addEventListener('click', () => {
      showScreen('journeyScreen');
      renderJourney();
    });
  }
});
