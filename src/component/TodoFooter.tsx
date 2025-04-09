import { useContext } from 'react';
import { TodoContex } from './Contex';
import { Filter } from '../types/Filter';

export const TodoFooter = () => {
  const { todos, filter, setFilter, removeAllCompleted } =
    useContext(TodoContex);
  const activeTodos = todos.filter(todo => !todo.completed).length;
  const filterName = (word: string) =>
    word.charAt(0).toUpperCase() + word.slice(1);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodos} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {Object.values(Filter).map(type => (
          <a
            key={type}
            href={`#/${type === 'all' ? '' : type}`}
            className={
              filter === type ? 'filter__link selected' : 'filter__link'
            }
            data-cy={`FilterLink${filterName(type)}`}
            onClick={() => setFilter(type)}
          >
            {filterName(type)}
          </a>
        ))}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={todos.every(todo => !todo.completed)}
        onClick={removeAllCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
