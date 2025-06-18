import { Dispatch } from 'react';
import { Filter, Todo } from '../entities/Todo';
import { Action } from './TodoContextTypes';

export const todoActions = (dispatch: Dispatch<Action>) => ({
  loadTodos: (todos: Todo[]) =>
    dispatch({ type: 'LOAD_TODOS', payload: todos }),
  addTodo: (todo: Todo) => dispatch({ type: 'ADD_TODO', payload: todo }),
  removeTodo: (id: number) => dispatch({ type: 'REMOVE_TODO', payload: id }),
  toggleTodo: (id: number) => dispatch({ type: 'TOGGLE_TODO', payload: id }),
  toggleAll: () => dispatch({ type: 'TOGGLE_ALL' }),
  clearCompleted: () => dispatch({ type: 'CLEAR_COMPLETED' }),
  editTodo: (id: number, title: string) =>
    dispatch({ type: 'EDIT_TODO', payload: { id, title } }),
  setFilter: (filter: Filter) =>
    dispatch({ type: 'SET_FILTER', payload: filter }),
});
