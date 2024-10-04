import React, { useEffect, useReducer } from 'react';
import { Todo } from '../types/Todo';
import { accessLocalStorage } from '../utils/LocalStorage';
import { Filters } from '../types/Filters';

function getNewId(min = 100000, max = 999999) {
  return Math.floor(Math.random() * (max - min)) + min;
}

type State = {
  todos: Todo[];
  filter: Filters;
};

type Action =
  | { type: 'getTodos' }
  | { type: 'setTodos'; payload: Todo[] }
  | { type: 'setFilter'; payload: Filters }
  | { type: 'addTodo'; payload: string }
  | { type: 'editTodo'; payload: { id: number; title: string } }
  | { type: 'deleteTodo'; payload: number }
  | { type: 'toggleTodo'; payload: number }
  | { type: 'deleteAllCompleted' }
  | { type: 'toggleAll' }
  | { type: 'setInputFiled' }
  | { type: 'getInputField'; payload: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'getTodos':
      return {
        ...state,
        todos: accessLocalStorage.get(),
      };

    case 'setTodos':
      accessLocalStorage.set([]);

      return { ...state };

    case 'setFilter':
      const newFilter = action.payload;

      return {
        ...state,
        filter: newFilter,
      };

    case 'addTodo':
      const newPost: Todo = {
        id: getNewId(),
        title: action.payload,
        completed: false,
      };

      accessLocalStorage.set([...accessLocalStorage.get(), newPost]);

      return {
        ...state,
        todos: accessLocalStorage.get(),
      };

    case 'toggleAll':
      const currentToToggleAll = accessLocalStorage.get();
      let toggledTodos: Todo[] = [];

      if (currentToToggleAll.every(todo => todo.completed)) {
        toggledTodos = currentToToggleAll.map((todo: Todo) => ({
          ...todo,
          completed: false,
        }));
      } else {
        toggledTodos = currentToToggleAll.map((todo: Todo) => ({
          ...todo,
          completed: true,
        }));
      }

      accessLocalStorage.set(toggledTodos);

      return {
        ...state,
        todos: accessLocalStorage.get(),
      };

    case 'editTodo':
      const currentToDel = accessLocalStorage.get();
      const { id, title } = action.payload;
      const editTodoIndex = currentToDel.findIndex(el => el.id === id);

      currentToDel[editTodoIndex].title = title;

      accessLocalStorage.set(currentToDel);

      return {
        ...state,
        todos: accessLocalStorage.get(),
      };

    case 'toggleTodo':
      const currentToToggle = accessLocalStorage.get();
      const toogleTodoIndex = currentToToggle.findIndex(
        el => el.id === action.payload,
      );

      currentToToggle[toogleTodoIndex].completed =
        !currentToToggle[toogleTodoIndex].completed;

      accessLocalStorage.set(currentToToggle);

      return {
        ...state,
        todos: accessLocalStorage.get(),
      };

    case 'deleteTodo':
      const newTodos = accessLocalStorage
        .get()
        .filter((todo: Todo) => todo.id !== action.payload);

      accessLocalStorage.set(newTodos);

      return {
        ...state,
        todos: accessLocalStorage.get(),
      };

    case 'deleteAllCompleted':
      const allNotCompleted = accessLocalStorage
        .get()
        .filter(todo => !todo.completed);

      accessLocalStorage.set(allNotCompleted);

      return {
        ...state,
        todos: accessLocalStorage.get(),
      };

    default:
      return { ...state };
  }
}

const initialState: State = {
  todos: [],
  filter: Filters.all,
};

export const StateContext = React.createContext(initialState);

export const DispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {},
);

type Props = {
  children: React.ReactNode;
};

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (accessLocalStorage.get().length <= 0) {
      dispatch({ type: 'setTodos', payload: [] });
    }

    dispatch({ type: 'getTodos' });
  }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
