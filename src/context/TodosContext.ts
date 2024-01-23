import React from 'react';
import { Todos } from '../types/Todos';

export const TodosContext = React.createContext<Todos>({
  todos: [],
  setTodos: () => { },
  id: +new Date(),
  setId: () => { },
  title: '',
  setTitle: () => { },
  isCompleted: false,
  setIsCompleted: () => { },
});
