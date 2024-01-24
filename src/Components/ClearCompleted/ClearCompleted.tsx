import { useContext } from 'react';
import { ReducerType } from '../../types';
import { DispatchContext } from '../../state/TodosContext';

export function ClearCompleted() {
  const dispatch = useContext(DispatchContext);

  const clearCompletedTodos = () => {
    dispatch({
      type: ReducerType.ClearCompletedTodos,
    });
  };

  return (
    <button
      type="button"
      className="clear-completed"
      onClick={clearCompletedTodos}
    >
      Clear completed
    </button>
  );
}
