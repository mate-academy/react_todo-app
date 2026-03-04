import React, { useMemo } from 'react';
import { Filter } from '../Filter/Filter';
import { useDispatch, useTodos } from '../../context/GlobalProvider';

export const Footer: React.FC = () => {
  const todos = useTodos();
  const dispatch = useDispatch();
  const count = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  const isDisabledFooter = !todos.some(todo => todo.completed === true);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {count} items left
      </span>

      <Filter />

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={isDisabledFooter}
        onClick={() => dispatch({ type: 'deleteCompleted' })}
      >
        Clear completed
      </button>
    </footer>
  );
};
