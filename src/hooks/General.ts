import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { reducer, initialState, Filter } from './Reducer';
import type { Todo } from '../types/Todo';
import type { State, Action } from './Reducer';

export type Editor = (args: {
  id: number;
  type: keyof Todo;
  value: boolean | string;
}) => void;

export const useGeneral = () => {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(
    reducer,
    initialState,
  );

  const { todos, filter } = state;

  useEffect(() => {
    const stored = localStorage.getItem('todos');

    if (!stored) {
      localStorage.setItem('todos', JSON.stringify(todos));
    } else {
      const parsed = JSON.parse(stored);

      dispatch({ type: 'SET_TODOS', payload: parsed });
    }
  }, []);

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

  const addTodo = (event: React.FormEvent, value: string) => {
    event.preventDefault();
    const newTitle = value.trim();
    const newId = +new Date();

    if (newTitle) {
      const newTodo: Todo = {
        id: newId,
        title: newTitle,
        completed: false,
      };

      dispatch({ type: 'ADD_TODO', payload: newTodo });
    }
  };

  const editTodo: Editor = useCallback(({ id, type, value }) => {
    dispatch({
      type: 'CHANGE_TODO',
      payload: { id: id, data: { param: type, value: value } },
    });
  }, []);

  const deleteTodo = useCallback(
    (event: React.MouseEvent<HTMLButtonElement> | null, id: number) => {
      event?.preventDefault();
      dispatch({ type: 'DELETE_TODO', payload: id });
    },
    [],
  );

  const toggle = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    dispatch({ type: 'TOGGLE' });
  };

  const setFilter = (
    event: React.MouseEvent<HTMLAnchorElement>,
    value: Filter,
  ) => {
    event.preventDefault();
    dispatch({ type: 'SET_FILTER', payload: value });
  };

  const clear = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    dispatch({ type: 'CLEAR' });
  };

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
  };
};
