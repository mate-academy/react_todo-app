import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { Filter } from '../../enums/Filter';
import { Todo } from '../../types/Todo';
import { ClearCompleted } from './ClearCompleted';

type Props = {
  todos: Todo[];
  filterValue: string | Filter;
  onCompleted: () => void;
  onAll: () => void;
  onActive: () => void;
  clearCompleted: () => void;
};

export const Footer: React.FC<Props> = ({
  todos,
  filterValue,
  onCompleted,
  onAll,
  onActive,
  clearCompleted,
}) => {
  const remainingTodos = todos.filter(todo => !todo.completed);
  const itemText = remainingTodos.length === 1 ? 'item' : 'items';

  return (
    <footer className="todoapp__footer">
      <span className="todo__count">
        {`${remainingTodos.length} ${itemText} left`}
      </span>

      <nav className="filter">
        <Link
          to="/"
          className={classNames('filter__link', {
            selected: filterValue === Filter.All,
          })}
          onClick={onAll}
        >
          All
        </Link>

        <Link
          to="active"
          className={classNames('filter__link', {
            selected: filterValue === Filter.Active,
          })}
          onClick={onActive}
        >
          Active
        </Link>

        <Link
          to="completed"
          className={classNames('filter__link', {
            selected: filterValue === Filter.Completed,
          })}
          onClick={onCompleted}
        >
          Completed
        </Link>
      </nav>

      <ClearCompleted todos={todos} clearCompleted={clearCompleted} />
    </footer>
  );
};
