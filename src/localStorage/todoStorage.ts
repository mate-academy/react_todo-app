import { Todo } from '../types/Todo';

export const saveTodo = () => {
  const saved = localStorage.getItem('todos');

  if (!saved || saved === 'undefined') {
    return [];
  }

  return JSON.parse(saved) as Todo[];
};
