import { useContext } from 'react';
import { LOCAL_STOR_KEY, SelectedContext, TodosContext } from '../store';
import cn from 'classnames';
import { Todo } from '../types/todo';

export const TodoFooter: React.FC = () => {
  const { dispatch } = useContext(TodosContext);
  const { selected, setSelected } = useContext(SelectedContext);
  const storedTodos = localStorage.getItem(LOCAL_STOR_KEY);
  const storedTodosArray: Todo[] = storedTodos ? JSON.parse(storedTodos) : [];
  const hasCompletedTodos = storedTodosArray.some(todo => todo.completed);

  const showAllTodos = () => {
    dispatch({ type: 'ALL' });
    setSelected('all');
  };

  if (!storedTodosArray.length) {
    return null;
  }

  const activeTodos = () => {
    dispatch({ type: 'ACTIVE' });
    setSelected('active');
  };

  const competedTodos = () => {
    dispatch({ type: 'COMPLETED' });
    setSelected('completed');
  };

  const clearCompetedTodos = () => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${storedTodosArray.filter(todo => !todo.completed).length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', { selected: selected === 'all' })}
          data-cy="FilterLinkAll"
          role="button"
          onClick={showAllTodos}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', { selected: selected === 'active' })}
          data-cy="FilterLinkActive"
          onClick={activeTodos}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', { selected: selected === 'completed' })}
          data-cy="FilterLinkCompleted"
          onClick={competedTodos}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={clearCompetedTodos}
        disabled={!hasCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
