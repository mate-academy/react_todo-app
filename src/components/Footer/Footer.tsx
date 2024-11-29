import React from 'react';
import { useTodos } from '../../context/context';
import { SelectedBy } from '../../types/SelectedBy';
import classNames from 'classnames';

const Footer: React.FC = () => {
  const { todos, selectedBy, setSelectedBy, clearAllCompletedTodos } =
    useTodos();
  const activeTodos = todos.filter(todo => !todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos.length} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(SelectedBy).map(value => (
          <a
            key={value}
            href={`#/${value}`}
            className={classNames('filter__link', {
              selected: selectedBy === value,
            })}
            data-cy={`FilterLink${value}`}
            onClick={() => setSelectedBy(value)}
          >
            {value}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={activeTodos.length === todos.length}
        onClick={clearAllCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
