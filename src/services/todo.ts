import { State } from '../types/State';
import { Todo } from '../types/Todo';

export const deleteTodo = (id: number, previousTodos: Todo[]): Todo[] => {
  return previousTodos.filter(el => el.id !== id);
};

export const switchCompleted = (
  id: number,
  status: boolean,
  previousTodos: Todo[],
) => {
  const newTodos = [...previousTodos];
  const index = newTodos.findIndex(el => el.id === id);

  newTodos[index].completed = status;

  return newTodos;
};

export const switchToggleAll = (
  status: boolean,
  previousTodos: Todo[],
): Todo[] => {
  const newTodos = [...previousTodos];

  return newTodos.map(el => {
    const newTodo = el;

    newTodo.completed = status;

    return newTodo;
  });
};

export const editTodoItem = (
  previousTodos: Todo[],
  payload: { id: number; value: string; },
): Todo[] => {
  const upDatedTotos = [...previousTodos];
  const { id, value } = payload;
  const index = previousTodos.findIndex(el => el.id === id);

  upDatedTotos[index].title = value;

  return upDatedTotos;
};

export const countTodos = (todos: Todo[]) => {
  const counter
   = todos.filter((el: Todo) => el.completed === false).length;

  return counter;
};

export const updateAndSave = (state : State): State => {
  const updatedState = {
    ...state,
  };

  updatedState.todosCounter = countTodos(updatedState.todos);
  updatedState.isCompleted = updatedState.todos.some(todo => todo.completed);
  localStorage.setItem('todos', JSON.stringify(updatedState));

  return updatedState;
};
