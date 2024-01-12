import { useContext, useMemo } from 'react';
import { DispatchContext, StateContext } from '../../store/store';
import { TodosFilter } from '../TodosFilter';
import { ActionType } from '../../types/ActionType';

import './Footer.scss';

export const Footer = () => {
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const activeCounter = useMemo(() => {
    const active = todos.filter(todo => !todo.completed);

    return active.length;
  }, [todos]);

  const completedCounter = useMemo(() => {
    const completed = todos.filter(todo => todo.completed);

    return completed.length;
  }, [todos]);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {activeCounter === 1
          ? `${activeCounter} item left`
          : `${activeCounter} items left`}
      </span>

      <TodosFilter />

      {completedCounter > 0
      && (
        <button
          type="button"
          className="clear-completed"
          onClick={() => dispatch({ type: ActionType.ClearCompletedTodos })}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
