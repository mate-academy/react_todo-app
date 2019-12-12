const cashedFilteredTodos = (handlerCallback) => {
  let prevArgs = [];
  let prevValue = [];

  return (...callbackArgs) => {
    if (callbackArgs.every((arg, i) => arg === prevArgs[i])) {
      return prevValue;
    }

    prevArgs = callbackArgs;
    prevValue = handlerCallback(...callbackArgs);

    return prevValue;
  };
};

export default cashedFilteredTodos;
