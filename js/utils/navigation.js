const showScreen = (screenId) => {
  const screens = document.querySelectorAll('.screen');
  screens.forEach((screen) => {
    screen.classList.toggle('active', screen.id === screenId);
  });
};

const setActiveRoot = (rootId) => {
  const roots = document.querySelectorAll('.root-group');
  roots.forEach((root) => {
    root.classList.toggle('active', root.dataset.root === rootId);
  });
};

const formatUserLabel = (state) => {
  if (!state.name && !state.nickname) return 'Explorador';
  if (state.name && state.nickname) return `${state.name} (${state.nickname})`;
  return state.name || state.nickname || 'Explorador';
};
