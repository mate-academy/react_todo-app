import React from 'react';
import { TodoContextType } from '../types/type';

export const TodoContext = React.createContext<TodoContextType | undefined>(
  undefined,
);
