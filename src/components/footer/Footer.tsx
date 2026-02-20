import { useContext, useEffect, useState } from 'react';
import { SortContext } from '../../store/SortContext';
import { TodoContext } from '../../store/TodoContext';
import { deleteCompletedAction } from '../../store/TodoReducer';

export const Footer = () => {
  const { todos, dispatch } = useContext(TodoContext);
  const { sortBy, sortDispatch } = useContext(SortContext);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(todos.filter(item => !item.completed).length);
  }, [todos]);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {count} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={
            sortBy === 'all' ? 'filter__link selected' : 'filter__link'
          }
          data-cy="FilterLinkAll"
          onClick={() => sortDispatch('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={
            sortBy === 'active' ? 'filter__link selected' : 'filter__link'
          }
          data-cy="FilterLinkActive"
          onClick={() => sortDispatch('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={
            sortBy === 'completed' ? 'filter__link selected' : 'filter__link'
          }
          data-cy="FilterLinkCompleted"
          onClick={() => sortDispatch('completed')}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => dispatch(deleteCompletedAction())}
      >
        Clear completed
      </button>
    </footer>
  );
};
