/* eslint-disable @typescript-eslint/indent */
import { Todo } from '../types/globalTypes';
import { Action, GlobalState } from './types';

const updateStorage = (newTodos: Todo[]) => {
  localStorage.setItem('todos', JSON.stringify(newTodos));
};

function reducer(state: GlobalState, action: Action): GlobalState {
  const { todos } = state;
  const { type } = action;

  switch (type) {
    case 'todoAdd':
      const newTodo = action.payload;

      updateStorage([...todos, newTodo]);

      return { ...state, todos: [...todos, newTodo] };
    case 'todoDelete':
      const idForDelete = action.payload.id;
      const newTodos = todos.filter(todo => todo.id !== idForDelete);

      updateStorage(newTodos);

      return { ...state, todos: newTodos };
    case 'todoDeleteAllCompleted':
      const activeTodos = todos.filter(todo => !todo.completed);

      updateStorage(activeTodos);

      return { ...state, todos: activeTodos };
    case 'todosCompleteAll':
      const completedTodosAll = todos.map(todo => ({
        ...todo,
        completed: true,
      }));

      updateStorage(completedTodosAll);

      return { ...state, todos: completedTodosAll };
    case 'todosActiveAll':
      const activeTodosAll = todos.map(todo => ({ ...todo, completed: false }));

      updateStorage(activeTodosAll);

      return { ...state, todos: activeTodosAll };
    case 'todoUpdate':
      const idForUpdate = action.payload.id;

      const updatedTodos = todos.map(todo => {
        return todo.id !== idForUpdate
          ? todo
          : {
              ...todo,
              title: action.payload.title ? action.payload.title : todo.title,
              completed:
                action.payload.completed !== undefined
                  ? action.payload.completed
                  : todo.completed,
            };
      });

      updateStorage(updatedTodos);

      return { ...state, todos: updatedTodos };
    case 'addMainInputElement':
      const mainInputElement = action.payload;

      mainInputElement?.focus();

      return { ...state, mainInputHTMLElement: mainInputElement };
    case 'isMainInputFocused':
      const updatedState = { ...state };

      if (action.payload) {
        updatedState.mainInputHTMLElement?.focus();
      } else {
        updatedState.mainInputHTMLElement?.blur();
      }

      return updatedState;
    case 'updateFilterType':
      return { ...state, filterType: action.payload };
    default:
      return state;
  }
}

export default reducer;
