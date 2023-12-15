interface Item {
  id: number
}

const getNewIdFor = (items: Item[]) => {
  const maxID = Math.max(...items.map(todo => todo.id));

  return Number.isFinite(maxID) ? maxID + 1 : 0;
};

export default getNewIdFor;
