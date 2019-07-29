const cashedFilteredTodos = (callback) => {
  let prevArgs = [];
  let prevValue = [];

  return (...todosAndStatut) => {
    if (todosAndStatut.every((arg, i) => arg === prevArgs[i])) {
      return prevValue;
    }

    const [todos, statut] = todosAndStatut;
    prevArgs = todosAndStatut;
    prevValue = callback(todos, statut);

    return prevValue;
  };
};

export default cashedFilteredTodos;
