import { FC } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Todo } from '../../types/Todo';
import {
  checkCompletedTodo,
  counterOfActiveTodos,
  filterTodos,
} from '../../helpers/helpers';
import { FilterParam } from '../../types/FilterParam';

type Props = {
  todos: Todo[],
  removeTodo: (todoId: number) => void,
};

export const Footer: FC<Props> = ({
  todos,
  removeTodo,
}) => {
  const removeCompletedTodos = () => {
    if (checkCompletedTodo(todos)) {
      const completedTodos = filterTodos(todos, FilterParam.Completed);

      completedTodos.forEach(todo => removeTodo(todo.id));
    }
  };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${counterOfActiveTodos(todos)} items left`}
      </span>

      <nav className="filter">
        {Object.values(FilterParam).map(link => (
          <NavLink
            key={link}
            to={`/${link}`}
            className={({ isActive }) => classNames(
              'filter__link',
              {
                selected: isActive,
              },
            )}
          >
            {link.charAt(0).toUpperCase() + link.slice(1)}
          </NavLink>
        ))}
      </nav>

      <button
        type="button"
        className={classNames(
          'todoapp__clear-completed',
          { 'is-invisible': !checkCompletedTodo(todos) },
        )}
        onClick={removeCompletedTodos}

      >
        Clear completed
      </button>

    </footer>
  );
};
