import React, { createContext, useReducer } from 'react';

import {
  FiltertActions,
  TodoActions,
  filterReducer,
  todoReducer,
} from './reducer';
import { InitialStateType } from './types/InitialStateType';
import { TodoType } from './types/TodoType';

const initialState: InitialStateType = {
  todos: [],
  itemsLeft() {
    if (this.todos.length) {
      return this.todos.filter(todo => todo.completed === false).length;
    }

    return 0;
  },
  filter: 'all',
  getVisibleTodos():TodoType[] | [] {
    switch (this.filter) {
      case 'all':
        return [...this.todos];
      case 'completed':
        return this.todos.filter(todo => todo.completed === true);
      case 'active':
        return this.todos.filter(todo => todo.completed === false);
      default:
        return [...this.todos];
    }
  },
};

const AppContext = createContext<{
  state: InitialStateType,
  dispatch: React.Dispatch<TodoActions | FiltertActions>
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  {
    todos,
    itemsLeft,
    filter,
    getVisibleTodos,
  }: InitialStateType,
  action: TodoActions | FiltertActions,
) => ({
  todos: todoReducer(todos, action),
  itemsLeft,
  getVisibleTodos,
  filter: filterReducer(filter, action),
});

type Props = {
  children: React.ReactNode
};

const AppProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
