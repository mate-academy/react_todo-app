export const saveState = (stateToSave) => {
  localStorage.setItem('state', JSON.stringify(stateToSave));
};

export const loadState = () => {
  return JSON.parse(localStorage.getItem('state'));
};
