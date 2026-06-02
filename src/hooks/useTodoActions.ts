import { useCallback, useContext } from 'react';
import { TodoDispatchContext } from '../context/TodoContext';
import { Todo } from '../types/Todo';
import { FilterOption } from '../types/FilterOption';

export const useTodoActions = () => {
  const dispatch = useContext(TodoDispatchContext);

  if (!dispatch) {
    throw new Error('useTodoActions must be used within TodoProvider');
  }

  return {
    addTodo: useCallback(
      (title: string) => {
        dispatch({ type: 'add', payload: title });
      },
      [dispatch],
    ),

    editTodo: useCallback(
      (id: Todo['id'], title: string) => {
        dispatch({ type: 'edit', payload: { id, title } });
      },
      [dispatch],
    ),

    toggleTodo: useCallback(
      (id: Todo['id']) => {
        dispatch({ type: 'toggle', payload: { id } });
      },
      [dispatch],
    ),

    toggleAll: useCallback(() => {
      dispatch({ type: 'toggleAll' });
    }, [dispatch]),

    removeTodo: useCallback(
      (id: Todo['id']) => {
        dispatch({ type: 'remove', payload: id });
      },
      [dispatch],
    ),

    removeCompleted: useCallback(() => {
      dispatch({ type: 'removeCompleted' });
    }, [dispatch]),

    setFilter: useCallback(
      (filter: FilterOption) =>
        dispatch({ type: 'setFilter', payload: filter }),
      [dispatch],
    ),
  };
};
