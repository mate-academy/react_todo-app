import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { TodosContext } from './TodosContext';
import { Status } from './store';

export const NavBar: React.FC = () => {
  const { todos, setTodos, incompleteCount, setFilter } =
    useContext(TodosContext);

  const [navClicked, setNavClicked] = useState({
    all: true,
    active: false,
    compleated: false,
  });

  const isAllComplited = todos.every(todo => todo.completed);

  const handleAllComplited = () => {
    const allComplited = todos.map(todo => {
      if (isAllComplited) {
        return { ...todo, completed: !todo.completed };
      }

      return { ...todo, completed: true };
    });

    setTodos(allComplited);
  };

  const handleVisible = (status: Status) => {
    switch (status) {
      case Status.Active:
        setFilter(Status.Active);
        setNavClicked({ all: false, active: true, compleated: false });
        break;

      case Status.Completed:
        setFilter(Status.Completed);
        setNavClicked({ all: false, active: false, compleated: true });
        break;

      case Status.All:
        setFilter(Status.All);
        setNavClicked({ all: true, active: false, compleated: false });
        break;

      default:
        setTodos(todos);
    }
  };

  return (
    <>
      {todos.length > 0 && (
        <nav className="tabs is-fullwidth" aria-label="breadcrumbs1">
          <ul>
            <li>
              <span className="icon is-small">
                <i
                  className={classNames('fas fa-check-double', {
                    'has-text-success': isAllComplited,
                  })}
                  onClick={handleAllComplited}
                ></i>
              </span>
              <strong className="has-text-success1">{`${incompleteCount} left`}</strong>
            </li>

            <li>
              <a onClick={() => handleVisible(Status.All)}>
                <span className="icon is-small">
                  <i
                    className={classNames('fas fa-book', {
                      'has-text-success': navClicked.all,
                    })}
                  ></i>
                </span>
                <span
                  className={classNames({
                    'has-text-success': navClicked.all,
                  })}
                >
                  All
                </span>
              </a>
            </li>

            <li>
              <a onClick={() => handleVisible(Status.Active)}>
                <span className="icon is-small">
                  <i
                    className={classNames('fas fa-puzzle-piece', {
                      'has-text-success': navClicked.active,
                    })}
                  ></i>
                </span>
                <span
                  className={classNames({
                    'has-text-success': navClicked.active,
                  })}
                >
                  Active
                </span>
              </a>
            </li>

            <li className="is-active1">
              <a onClick={() => handleVisible(Status.Completed)}>
                <span className="icon is-small">
                  <i
                    className={classNames('fas fa-thumbs-up', {
                      'has-text-success': navClicked.compleated,
                    })}
                  ></i>
                </span>
                <span
                  className={classNames({
                    'has-text-success': navClicked.compleated,
                  })}
                >
                  Completed
                </span>
              </a>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};
