import React, { useContext } from 'react';
import { TodosContext } from '../../context';
import { Filter } from '../../enums/Enums';
import classNames from 'classnames';

export const TodoFooter: React.FC = () => {
  const { todos, activeTodos, filter, setFilter, deleteHandler } =
    useContext(TodosContext);

  const deleteCompleted = () => {
    const idsToDelete: number[] = [];

    todos.forEach(todo => {
      const { completed, id } = todo;

      if (completed) {
        idsToDelete.push(id);
      }
    });

    deleteHandler(idsToDelete);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(Filter).map((value, i) => (
          <a
            href="#/"
            key={value + i}
            className={classNames('filter__link', {
              selected: filter === value,
            })}
            data-cy={`FilterLink${value}`}
            onClick={() => setFilter(value)}
          >
            {value}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={activeTodos === todos.length}
        onClick={deleteCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
