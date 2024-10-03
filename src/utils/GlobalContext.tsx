import React, { useEffect, useReducer } from 'react';
import { Todo } from '../types/Todo';
import { LocalStorage } from './LocalStorage';
import { Filters } from '../types/Filters';

function filterTodos(todos: Todo[], filter: Filters): Todo[] {
  switch (filter) {
    case Filters.completed:
      return todos.filter(todo => todo.completed === true);

    case Filters.active:
      return todos.filter(todo => todo.completed === false);
  }

  return todos;
}

function getNewId(min = 100000, max = 999999) {
  return Math.floor(Math.random() * (max - min)) + min;
}

type State = {
  todos: Todo[];
  filteredTodos: Todo[];
  filter: Filters;
};

type Action =
  | { type: 'getTodos' }
  | { type: 'getFilteredTodos' }
  | { type: 'setFilter'; payload: Filters }
  | { type: 'addTodo'; payload: string }
  | { type: 'editTodo'; payload: { id: number; title: string } }
  | { type: 'deleteTodo'; payload: number }
  | { type: 'toggleTodo'; payload: number }
  | { type: 'deleteAllCompleted' }
  | { type: 'toggleAll' };

function reducer(state: State, action: Action): State {
  function updateAllTodos() {
    const latestFromServer = LocalStorage.get();

    return {
      todos: latestFromServer,
      filteredTodos: filterTodos(latestFromServer, state.filter),
    };
  }

  switch (action.type) {
    case 'getTodos':
      return {
        ...state,
        todos: LocalStorage.get(),
      };

    case 'getFilteredTodos':
      return {
        ...state,
        filteredTodos: filterTodos(LocalStorage.get(), state.filter),
      };

    case 'setFilter':
      const newFilter = action.payload;

      return {
        ...state,
        filter: newFilter,
        filteredTodos: filterTodos(LocalStorage.get(), newFilter),
      };

    case 'addTodo':
      const newPost: Todo = {
        id: getNewId(),
        title: action.payload,
        completed: false,
      };

      LocalStorage.set([...LocalStorage.get(), newPost]);

      return {
        ...state,
        ...updateAllTodos(),
      };

    case 'toggleAll':
      const currentToToggleAll = LocalStorage.get();
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

      LocalStorage.set(toggledTodos);

      return {
        ...state,
        ...updateAllTodos(),
      };

    case 'editTodo':
      const currentToDel = LocalStorage.get();
      const { id, title } = action.payload;
      const editTodoIndex = currentToDel.findIndex(el => el.id === id);

      currentToDel[editTodoIndex].title = title;

      LocalStorage.set(currentToDel);

      return {
        ...state,
        ...updateAllTodos(),
      };

    case 'toggleTodo':
      const currentToToggle = LocalStorage.get();
      const toogleTodoIndex = currentToToggle.findIndex(
        el => el.id === action.payload,
      );

      currentToToggle[toogleTodoIndex].completed =
        !currentToToggle[toogleTodoIndex].completed;

      LocalStorage.set(currentToToggle);

      return {
        ...state,
        ...updateAllTodos(),
      };

    case 'deleteTodo':
      const newTodos = LocalStorage.get().filter(
        (todo: Todo) => todo.id !== action.payload,
      );

      LocalStorage.set(newTodos);

      return {
        ...state,
        ...updateAllTodos(),
      };

    case 'deleteAllCompleted':
      const allNotCompleted = LocalStorage.get().filter(
        todo => !todo.completed,
      );

      LocalStorage.set(allNotCompleted);

      return {
        ...state,
        ...updateAllTodos(),
      };

    default:
      return { ...state };
  }
}

const initialState: State = {
  todos: [],
  filteredTodos: [],
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
    dispatch({ type: 'getTodos' });
    dispatch({ type: 'getFilteredTodos' });
  }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
