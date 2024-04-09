import { Action } from '../types/Action';
import { Status } from '../types/Status';
import { Todo } from '../types/Todo';
import { input } from './input';

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
  title: string,
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
      title: newTitle.trim(),
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

export const handleSubmit = (
  e: React.FormEvent<HTMLFormElement>,
  title: string,
  todos: Todo[],
  dispatch: (action: Action) => void,
) => {
  e.preventDefault();

  if (!input.checkInput(title)) {
    dispatch({
      type: 'todos',
      payload: [
        ...todos,
        {
          id: +new Date(),
          title: title.trim(),
          completed: false,
        },
      ],
    });
  }
};

export const handleEditing = (
  todo: Todo,
  title: string,
  todos: Todo[],
  dispatch: (action: Action) => void,
) => {
  if (input.checkInput(title)) {
    input.deleteTodo(todo.id, todos, dispatch);
  } else {
    updatedTodos(dispatch, todos, todo, false, title);
  }
};
