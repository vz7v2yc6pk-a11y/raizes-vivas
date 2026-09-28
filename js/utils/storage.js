const STORAGE_KEY = 'raizes-vivas-state';

const getDefaultState = () => ({
  name: '',
  nickname: '',
  characterId: null,
  currentRoot: null,
  discoveredRoots: [],
  completed: false,
  journeyCount: 0,
  lastScreen: 'homeScreen'
});

const loadState = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved ? { ...getDefaultState(), ...saved } : getDefaultState();
  } catch (error) {
    console.warn('Não foi possível carregar o estado. Usando padrão.', error);
    return getDefaultState();
  }
};

const saveState = (state) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

const resetJourney = () => {
  const fresh = getDefaultState();
  saveState(fresh);
  return fresh;
};
