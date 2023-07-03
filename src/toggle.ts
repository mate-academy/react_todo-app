import { Todo } from './Todo';

export const toggleTodoComplete = (todos: Todo[], completed: boolean) => {
  return todos.map(todo => {
    const { id, title } = todo;
    const toggleTodo = {
      id,
      title,
      completed,
    };

    return toggleTodo;
  });
};
