import cn from 'classnames';

import { useContext } from 'react';
import { TodosContext } from './TodosContext';
import { FilterOption } from '../types/FilterOption';
import { getNumberActiveTodo } from '../tools/getNumberActiveTodo';

export const Footer: React.FC = () => {
  const {
    todos,
    setTodos,
    filterOption,
    setFilterOption,
  } = useContext(TodosContext);

  const handleClickAll = () => {
    setFilterOption(FilterOption.All);
  };

  const handleClickActive = () => {
    setFilterOption(FilterOption.Active);
  };

  const handleClickCompleted = () => {
    setFilterOption(FilterOption.Completed);
  };

  const handleDeleteCompleted = () => {
    const newTodos = todos.filter(todo => !todo.completed);

    setTodos(newTodos);
  };

  return (
    todos.length !== 0 ? (
      <footer className="footer">
        <span
          className="todo-count"
          data-cy="todosCounter"
        >
          {`${getNumberActiveTodo(todos)} items left`}
        </span>

        <ul className="filters">
          <li>
            <a
              href="#/"
              className={cn({
                selected: filterOption === FilterOption.All,
              })}
              onClick={handleClickAll}
            >
              All
            </a>
          </li>

          <li>
            <a
              href="#/active"
              className={cn({
                selected: filterOption === FilterOption.Active,
              })}
              onClick={handleClickActive}
            >
              Active
            </a>
          </li>

          <li>
            <a
              href="#/completed"
              onClick={handleClickCompleted}
              className={cn({
                selected: filterOption === FilterOption.Completed,
              })}
            >
              Completed
            </a>
          </li>
        </ul>

        {todos.some(todo => todo.completed) && (
          <button
            type="button"
            className="clear-completed"
            onClick={handleDeleteCompleted}
          >
            Clear completed
          </button>
        )}
      </footer>
    ) : (
      <></>
    )
  );
};
