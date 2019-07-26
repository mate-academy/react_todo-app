export const saveState = (stateToSave) => {
  localStorage.setItem('state', JSON.stringify(stateToSave));
};

export const loadState = () => {
  console.log(JSON.parse(localStorage.getItem('state')));
  return JSON.parse(localStorage.getItem('state'));
};
