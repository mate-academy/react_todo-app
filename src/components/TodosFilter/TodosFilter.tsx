import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCompleted, FilterBy, setFilterBy } from '../../store';
import { getTodosSelector } from '../../store/selectors';

export const TodosFilter: React.FC = () => {
  const todos = useSelector(getTodosSelector);
  const dispatch = useDispatch();

  const unfinishedTodos = todos.reduce((accum, todo) => {
    return accum + (todo.completed ? 0 : 1);
  }, 0);

  const finishedTodos = todos.length - unfinishedTodos;

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${unfinishedTodos} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className="selected"
            onClick={() => {
              dispatch(setFilterBy(FilterBy.ALL_TODOS));
            }}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            onClick={() => {
              dispatch(setFilterBy(FilterBy.ACTIVE_TODOS));
            }}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            onClick={() => {
              dispatch(setFilterBy(FilterBy.COMPLETED_TODOS));
            }}
          >
            Completed
          </a>
        </li>
      </ul>

      {!!finishedTodos && (
        <button
          type="button"
          className="clear-completed"
          onClick={() => {
            dispatch(deleteCompleted());
          }}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
