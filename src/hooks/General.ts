import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { reducer, initState, Filter, init } from './Reducer';
import type { Todo } from '../types/Todo';

export type EditData = (args: {
  id: number;
  type: keyof Todo;
  value: boolean | string;
}) => void;

export const useGeneral = () => {
  const [state, dispatch] = useReducer(reducer, initState, init);

  const { todos, filter } = state;

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const visibleTodos = useMemo(() => {
    switch (filter) {
      case Filter.ACTIVE:
        return todos.filter(t => !t.completed);
      case Filter.COMPLETED:
        return todos.filter(t => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const addTodo = useCallback((value: string) => {
    const newId = +new Date();

    const newTodo: Todo = {
      id: newId,
      title: value,
      completed: false,
    };

    dispatch({ type: 'ADD_TODO', payload: newTodo });
  }, []);

  const editTodo: EditData = useCallback(({ id, type, value }) => {
    dispatch({
      type: 'CHANGE_TODO',
      payload: { id: id, data: { param: type, value: value } },
    });
  }, []);

  const deleteTodo = useCallback((id: number) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  }, []);

  const toggle = useCallback(() => {
    dispatch({ type: 'TOGGLE_COMPLETED' });
  }, []);

  const setFilter = useCallback((value: Filter) => {
    dispatch({ type: 'SET_FILTER', payload: value });
  }, []);

  const clear = useCallback(() => {
    dispatch({ type: 'CLEAR' });
  }, []);

  const activeCount = useMemo(
    () => todos.filter(todo => !todo.completed).length,
    [todos],
  );

  return {
    addTodo,
    editTodo,
    deleteTodo,
    visibleTodos,
    todos,
    filter,
    setFilter,
    clear,
    toggle,
    activeCount,
  };
};
