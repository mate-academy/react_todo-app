import React, { useContext } from 'react';
import { TodoContext } from './TodoContext';
import classNames from 'classnames';
import { Query } from '../types/Query';

type Props = {
  setQuery: React.Dispatch<React.SetStateAction<Query>>;
  filter: Query;
};

export const TodoFooter: React.FC<Props> = ({ setQuery, filter }) => {
  const { todos, setTodos } = useContext(TodoContext);
  const todosLeft = todos.filter(todo => !todo.completed).length;

  const handeClearCompleted = () => {
    const newTodos = [];

    for (let i = 0; i < todos.length; i++) {
      if (!todos[i].completed) {
        newTodos.push(todos[i]);
      }
    }

    setTodos(newTodos);
  };

  const returnValue =
    todos.length > 0 ? (
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {`${todosLeft} items left`}
        </span>

        {/* Active link should have the 'selected' class */}
        <nav className="filter" data-cy="Filter">
          <a
            href="#/"
            onClick={() => setQuery(Query.All)}
            className={classNames('filter__link', {
              selected: filter === Query.All,
            })}
            data-cy="FilterLinkAll"
          >
            All
          </a>

          <a
            href="#/active"
            onClick={() => setQuery(Query.Active)}
            className={classNames('filter__link', {
              selected: filter === Query.Active,
            })}
            data-cy="FilterLinkActive"
          >
            Active
          </a>

          <a
            href="#/completed"
            onClick={() => setQuery(Query.Completed)}
            className={classNames('filter__link', {
              selected: filter === Query.Completed,
            })}
            data-cy="FilterLinkCompleted"
          >
            Completed
          </a>
        </nav>

        {/* this button should be disabled if there are no completed todos */}
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          onClick={handeClearCompleted}
        >
          Clear completed
        </button>
      </footer>
    ) : (
      <div> </div>
    );

  return returnValue;
};
