import { useContext } from 'react';
import { TodoContext } from './TodoContext';
import { TodoFilter } from '../types/TodoFilter';
import classNames from 'classnames';

export const Footer = () => {
  const { todos, filterBy, setFilterBy, setTodos } = useContext(TodoContext);

  const activeTodosLength = todos.filter(t => !t.completed).length;
  const isDisabledBtn = !(todos.length - activeTodosLength);
  const title =
    activeTodosLength === 1 ? '1 item left' : `${activeTodosLength} items left`;

  const filterTodos = (status: TodoFilter) => {
    switch (status) {
      case TodoFilter.Active:
        setFilterBy(TodoFilter.Active);
        break;
      case TodoFilter.Completed:
        setFilterBy(TodoFilter.Completed);
        break;
      default:
        setFilterBy(TodoFilter.All);
    }
  };

  const deleteCompleted = () => {
    setTodos(todos.filter(t => !t.completed));
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {title}
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(TodoFilter).map(filterValue => {
          const capitalizedFilterValue =
            filterValue[0].toUpperCase() + filterValue.slice(1);

          return (
            <a
              key={filterValue}
              href={`#/${filterValue}`}
              className={classNames('filter__link', {
                selected: filterBy === filterValue,
              })}
              data-cy={`FilterLink${capitalizedFilterValue}`}
              onClick={() => filterTodos(filterValue)}
            >
              {capitalizedFilterValue}
            </a>
          );
        })}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        style={{ visibility: `${isDisabledBtn ? 'hidden' : 'visible'}` }}
        data-cy="ClearCompletedButton"
        onClick={deleteCompleted}
        disabled={isDisabledBtn}
      >
        Clear completed
      </button>
    </footer>
  );
};
