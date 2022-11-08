import React, {
  useMemo,
  useState,
} from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { TodoStatus } from '../../../types/TodoStatus';
import { FilterLinkType } from '../../../types/FilterLinkType';

type Props = {
  text: string;
  onTodoFilter: (filterStatus: TodoStatus) => void;
};

export const FilterLink: React.FC<Props> = ({
  text,
  onTodoFilter,
}) => {
  const [toLink, setToLink] = useState('');
  const [todoType, setTodoType] = useState(FilterLinkType.ALL);
  const [todoFilter, setTodoFilter] = useState(TodoStatus.ALL);

  useMemo(() => {
    switch (text) {
      case 'Active':
        setToLink('active');
        setTodoType(FilterLinkType.ACTIVE);
        setTodoFilter(TodoStatus.ACTIVE);
        break;

      case 'Completed':
        setToLink('completed');
        setTodoType(FilterLinkType.COMPLETED);
        setTodoFilter(TodoStatus.COMPLETED);
        break;

      case 'All':
      default:
        setToLink('/');
        setTodoType(FilterLinkType.ALL);
        setTodoFilter(TodoStatus.ALL);
        break;
    }
  }, []);

  return (
    <NavLink
      to={toLink}
      data-cy={todoType}
      className={({ isActive }) => classNames(
        'filter__link',
        { selected: isActive },
      )}
      onClick={() => onTodoFilter(todoFilter)}
    >
      {text}
    </NavLink>
  );
};
