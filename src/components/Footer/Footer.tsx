import classNames from 'classnames';
import React, { useContext } from 'react';
import { FilterTypes } from '../../types/FilterTypes';
import { TodoContext } from '../../context/TodoContext';

interface Props {}

export const Footer: React.FC<Props> = () => {
  const { todos, deleteTodo, setFilterType, selectedFilter } =
    useContext(TodoContext);

  const completedTodos = [...todos].filter(todo => todo.completed);
  const activeCountLength = todos.length - completedTodos.length;

  const deleteCompletedTodos = () => {
    completedTodos.map(todo => {
      deleteTodo(todo.id);
    });
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeCountLength} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(FilterTypes).map(type => (
          <a
            key={type}
            href={`#/${type === 'All' ? '' : type.toLowerCase()}`}
            className={classNames('filter__link', {
              selected: selectedFilter === type,
            })}
            data-cy={'FilterLink' + type}
            onClick={() => setFilterType(type)}
          >
            {type}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={completedTodos.length === 0}
        onClick={deleteCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
