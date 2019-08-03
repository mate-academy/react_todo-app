const createCachedFilteredFor = (callBack) => {
  let prevArg = [];
  let prevValue = null;

  return (...args) => {
    if (args.every((arg, i) => arg === prevArg[i])) {
      return prevValue;
    }
    prevArg = args;
    prevValue = callBack(...args);

    return prevValue;
  };
};

const filteredForField = (todos, sortField) => {
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

const filterFieldCaching = createCachedFilteredFor(filteredForField);

export default filterFieldCaching;
