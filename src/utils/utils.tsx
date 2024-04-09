import { Action } from '../types/Action';
import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const changeTodosStatuses = (
  changeStatus: boolean,
  todos: Todo[],
  dispatch: (action: Action) => void,
) => {
  if (changeStatus) {
    dispatch({
      type: 'todos',
      payload: todos.map(oldTodo => ({ ...oldTodo, completed: false })),
    });
  } else {
    dispatch({
      type: 'todos',
      payload: todos.map(oldTodo => ({ ...oldTodo, completed: true })),
    });
  }
};

export const filterTodos = (filter: Status, todos: Todo[]) => {
  const displayedTodos = todos.filter((todo: Todo) => {
    switch (filter) {
      case Status.active:
        return todo.completed === false;

      case Status.completed:
        return todo.completed === true;

      default:
        return todos;
    }
  });

  localStorage.setItem('todos', JSON.stringify(displayedTodos));

  return displayedTodos;
};

export function countPreparedItems(todos: Todo[]) {
  const preparedTodos = filterTodos(Status.active, todos);

  return preparedTodos.length;
}

export const updatedTodos = (
  dispatch: (action: Action) => void,
  todos: Todo[],
  todo: Todo,
  changeCompleted: boolean,
  title = '',
) => {
  const index = todos.findIndex(anyTodo => anyTodo.id === todo.id);
  const currentTodo = todos[index];
  const newTodos = [...todos];

  if (currentTodo) {
    const newTitle = title.length > 0 ? title : currentTodo.title;
    const newCompleted = changeCompleted
      ? !currentTodo.completed
      : currentTodo.completed;

    const updatedTodo: Todo = {
      ...todos[index],
      title: newTitle,
      completed: newCompleted,
    };

    newTodos.splice(index, 1, updatedTodo);
  }

  dispatch({
    type: 'todos',
    payload: newTodos,
  });
};

export const clearCompletedTodos = (
  todos: Todo[],
  dispatch: (action: Action) => void,
) => {
  const newTodos = todos.filter(todo => todo.completed === false);

  dispatch({
    type: 'todos',
    payload: newTodos,
  });
};
