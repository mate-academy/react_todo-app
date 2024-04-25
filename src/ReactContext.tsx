import { createContext } from 'react';
import { Context } from './types/Context';

export const ReactContext = createContext<Context>({
  firstTask: false,
  setFirstTask: () => {},
  todos: [],
  setTodoses: () => {},
  filter: 'All',
  setFilter: () => {},
});
