import React, { useContext } from 'react';
import { TodosContext } from './TodosContext';
import { Filter } from '../Types/Filter';
import cn from 'classnames';

interface Props {
  input: React.RefObject<HTMLInputElement>;
  filter: Filter;
  setFilter: (v: Filter) => void;
}

export const Footer: React.FC<Props> = ({ input, filter, setFilter }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const activeTodos = todos.reduce(
    (prev, todo) => (todo.completed ? prev : prev + 1),
    0,
  );

  const handleClearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
    input.current?.focus();
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos} {activeTodos === 1 ? 'item' : 'items'} left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(Filter).map(value => (
          <a
            key={value}
            href={`#/${value.toLowerCase()}`}
            className={cn('filter__link', { selected: value === filter })}
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
        disabled={!todos.some(todo => todo.completed)}
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
