const getSortFied = (todos, sortField) => {
  if (sortField === 'all') {
    return todos;
  }

  const callBackSort = {
    active: a => !a.completed,
    completed: a => a.completed,
  };
  const callBack = callBackSort[sortField];

  return todos.filter(callBack);
};

export default getSortFied;
