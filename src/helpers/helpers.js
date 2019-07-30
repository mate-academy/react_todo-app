const cashedFilteredTodos = (handlerFunction) => {
  let prevArgs = [];
  let prevValue = [];

  return (...callbackArgs) => {
    if (callbackArgs.every((arg, i) => arg === prevArgs[i])) {
      return prevValue;
    }

    prevArgs = callbackArgs;
    prevValue = handlerFunction(...callbackArgs);

    return prevValue;
  };
};

export default cashedFilteredTodos;
