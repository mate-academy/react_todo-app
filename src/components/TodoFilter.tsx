import React, { useContext, useState } from 'react';
import { TodosContext } from './TodosContext';
import cn from 'classnames';

type ActiveLink = {
  all: boolean;
  active: boolean;
  completed: boolean;
};

export const TodosFilter: React.FC = () => {
  const { todos, filterList, clearTodos, filteredTodos, todosCompleted } =
    useContext(TodosContext);

  const [activeLink, setActiveLink] = useState<ActiveLink>({
    all: false,
    active: false,
    completed: false,
  });
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const href = e.currentTarget.getAttribute('href') || '';

    filterList(href);
    switch (href) {
      case '#/':
        return setActiveLink(prevDate => ({
          ...prevDate,
          all: true,
          active: false,
          completed: false,
        }));
      case '#/active':
        return setActiveLink(prevDate => ({
          ...prevDate,
          all: false,
          active: true,
          completed: false,
        }));
      case '#/completed':
        return setActiveLink(prevDate => ({
          ...prevDate,
          all: false,
          active: false,
          completed: true,
        }));
      default:
        return;
    }
  };

  const todosLeft = todos.filter(todo => !todo.completed);

  return (
    <>
      <span className="todo-count" data-cy="todosCounter">
        {todosLeft.length < 1 && filteredTodos.length < 1
          ? ''
          : todosLeft.length === 1
            ? `${todosLeft.length} item left`
            : todosLeft.length > 1 && `${todosLeft.length} items left`}
      </span>
      <ul className="filters" data-cy="todosFilter">
        <li>
          <a
            href="#/"
            className={cn({ selected: activeLink.all })}
            onClick={handleClick}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={cn({ selected: activeLink.active })}
            onClick={handleClick}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={cn({ selected: activeLink.completed })}
            onClick={handleClick}
          >
            Completed
          </a>
        </li>
      </ul>
      {todosCompleted.length > 0 && (
        <button type="button" className="clear-completed" onClick={clearTodos}>
          Clear completed
        </button>
      )}
    </>
  );
};
