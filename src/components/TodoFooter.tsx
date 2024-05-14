import React, { useContext, useState } from 'react';
import { TodoContext } from './TodoContext';
import classNames from 'classnames';
import { Query } from '../types/Query';

type Props = {
  setQuery: React.Dispatch<React.SetStateAction<Query>>;
};

export const TodoFooter: React.FC<Props> = ({ setQuery }) => {
  const { todos, setTodos } = useContext(TodoContext);
  const todosLeft = todos.filter(todo => !todo.completed).length;
  const [isSelectedAll, setIsSelectedAll] = useState(true);
  const [isSelectedCompleted, setIsSelectedCompleted] = useState(false);
  const [isSelectedActive, setIsSelectedActive] = useState(false);

  const handleShowCompleted = () => {
    setQuery(Query.Completed);
  };

  const handleShowActive = () => {
    setQuery(Query.Active);
  };

  const handleShowAll = () => {
    setQuery(Query.All);
  };

  const handeClearCompleted = () => {
    const newTodos = [];

    for (let i = 0; i < todos.length; i++) {
      if (!todos[i].completed) {
        newTodos.push(todos[i]);
      }
    }

    setTodos(newTodos);
  };

  const handleAllButtonClick = () => {
    handleShowAll();
    setIsSelectedAll(true);
    setIsSelectedActive(false);
    setIsSelectedCompleted(false);
  };

  const handleActiveButtonClick = () => {
    setIsSelectedActive(true);
    setIsSelectedAll(false);
    setIsSelectedCompleted(false);
    handleShowActive();
  };

  const handleCompletedButtonClick = () => {
    setIsSelectedCompleted(true);
    setIsSelectedAll(false);
    setIsSelectedActive(false);
    handleShowCompleted();
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
            onClick={handleAllButtonClick}
            className={classNames('filter__link', { selected: isSelectedAll })}
            data-cy="FilterLinkAll"
          >
            All
          </a>

          <a
            href="#/active"
            onClick={handleActiveButtonClick}
            className={classNames('filter__link', {
              selected: isSelectedActive,
            })}
            data-cy="FilterLinkActive"
          >
            Active
          </a>

          <a
            href="#/completed"
            onClick={handleCompletedButtonClick}
            className={classNames('filter__link', {
              selected: isSelectedCompleted,
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
