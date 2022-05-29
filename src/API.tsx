export const getTodoList = (): Todo[] => {
  const todoListString = localStorage.getItem('todoList');

  if (todoListString === null) {
    return [];
  }

  const todoList = JSON.parse(todoListString);

  return todoList;
};

export const saveTodoList = (todoList: Todo[]) => {
  localStorage.setItem('todoList', JSON.stringify(todoList));
};
