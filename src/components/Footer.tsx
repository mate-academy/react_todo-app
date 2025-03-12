import React, { useContext } from 'react';
import { Todo } from '../types/Todo';
import { TodoContext } from './SetTodosContext';
import { TypeFilter } from '../types/TypeFilter';
import classNames from 'classnames';

interface Props {
  todos: Todo[];
}
export const Footer: React.FC<Props> = ({ todos }) => {
  const notCompletedTodos = todos.filter(todo => !todo.completed);

  const todoContext = useContext(TodoContext);

  // useEffect(() => {}, [todoContext?.filter]);

  if (!todoContext) {
    return null;
  }

  const { filter, setFilter } = todoContext;

  const handleFilterChange = (filteredValue: string) => {
    setFilter(filteredValue);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {notCompletedTodos.length} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {Object.values(TypeFilter).map(filteredValue => (
          <a
            key={filteredValue}
            href={`#${filteredValue.toLowerCase()}`}
            className={classNames('filter__link', {
              selected: filter === filteredValue,
            })}
            data-cy={`FilterLink${filteredValue}`}
            onClick={() => handleFilterChange(filteredValue)}
          >
            {filteredValue}
          </a>
        ))}
        {/* <a
          href="#/"
          className="filter__link selected"
          data-cy="FilterLinkAll"
          onClick={filterTodos()}
        >
          All
        </a>

        <a
          href="#/active"
          className="filter__link"
          data-cy="FilterLinkActive"
          onClick={filterTodos(TypeFilter.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className="filter__link"
          data-cy="FilterLinkCompleted"
          onClick={filterTodos(TypeFilter.Completed)}
        >
          Completed
        </a> */}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
