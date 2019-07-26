
const getSortFied = (todos, sortField) => {
  if (sortField === 'All') {
    return todos;
  }

  const callBackSort = {
    Active: a => !a.completed,
    Completed: a => a.completed,
  };
  const callBack = callBackSort[sortField];
  debugger;
  return todos.filter(callBack);
};

export default getSortFied;
