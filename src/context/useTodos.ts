import { useContext } from 'react';
import { todosContext, TypeTodosContext } from './todosContext';

export const useTodos = (): TypeTodosContext => useContext(todosContext);
