import { Todo, EditPayload } from '../../Types/Types';

export const deleteTodo = (initialValue: Todo[], todosToDelete: Todo[]) => {
  const todosId = todosToDelete.map(todo => todo.id);

  try {
    const newValue = initialValue.filter(todo => !todosId.includes(todo.id));

    return newValue;
  } catch {
    return initialValue;
  }
};

export const addTodo = (initialValue: Todo[], title: string) => {
  const newTodo = {
    id: +new Date(),
    title: title,
    completed: false,
  };

  const newTodos = [...initialValue, newTodo];

  try {
    return newTodos;
  } catch {
    return initialValue;
  }
};

export const checkTodo = (initialValue: Todo[], checkedTodo: Todo) => {
  return initialValue.map(todo => {
    if (todo.id === checkedTodo.id) {
      return { ...todo, completed: !todo.completed };
    } else {
      return todo;
    }
  });
};

export const toggleAll = (initialValue: Todo[]) => {
  if (initialValue.every(todo => todo.completed)) {
    return initialValue.map(todo => ({ ...todo, completed: false }));
  } else {
    return initialValue.map(todo => {
      if (todo.completed === false) {
        return { ...todo, completed: true };
      } else {
        return todo;
      }
    });
  }
};

export const editTodo = (initialValue: Todo[], editedTodo: EditPayload) => {
  const newValue = initialValue.map(todo => {
    if (todo.id === editedTodo.todo.id) {
      return { ...todo, title: editedTodo.trimmedTitle };
    } else {
      return todo;
    }
  });

  return newValue;
};
