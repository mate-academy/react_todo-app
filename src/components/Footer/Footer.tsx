import classNames from 'classnames';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { deleteTodo, getTodos } from '../../api/todos';
import { ErrorType } from '../../types/ErrorType';
import { FilterType } from '../../types/FilterType';
import { Todo } from '../../types/Todo';
import { AuthContext } from '../Auth/AuthContext';
import { ContextTextError } from '../Context/ContextTextError';
import { ContextTodos } from '../Context/ContextTodos';
import { ContextToggleAll } from '../Context/ContextToggleAll';

import './Footer.scss';

type Props = {
  unCompletedTodos: Todo[] | void;
  completedTodos: Todo[] | void;
  setTypeOfFilter: (type: string) => void;
  typeOfFilter: string;
};

export const Footer: React.FC<Props> = React.memo(
  ({
    unCompletedTodos, completedTodos, setTypeOfFilter, typeOfFilter,
  }) => {
    const { user } = useContext(AuthContext);
    const userId = user?.id || 0;
    const { setTextError } = useContext(ContextTextError);
    const { setTodos } = useContext(ContextTodos);
    const { setIsToggleAllCompleted } = useContext(ContextToggleAll);

    const filtersList = [
      { title: 'All', value: FilterType.ALL, to: '/' },
      { title: 'Active', value: FilterType.ACTIVE, to: '/active' },
      { title: 'Completed', value: FilterType.COMPLETED, to: '/completed' },
    ];

    const handlerClearAllClick = () => {
      setIsToggleAllCompleted(true);
      completedTodos?.map((todo) => deleteTodo(todo.id)
        .then(() => {
          getTodos(userId as number)
            .then((todoFromServer) => setTodos(todoFromServer))
            .catch(() => setTextError(ErrorType.GET));
        })
        .catch(() => setTextError(ErrorType.DELETE))
        .finally(() => setIsToggleAllCompleted(false)));
    };

    return (
      <footer className="footer todoapp__footer">
        <span className="footer__todo-count" data-cy="todosCounter">
          {`${unCompletedTodos?.length} items left`}
        </span>

        <ul className="footer__filters filters">
          {filtersList.map((filter) => (
            <li key={filter.title}>
              <Link
                to={filter.to}
                className={classNames('filters__item', {
                  selected: typeOfFilter === filter.value,
                })}
                onClick={() => setTypeOfFilter(filter.value)}
              >
                {filter.title}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className={classNames('footer__clear-completed', {
            hidden: completedTodos?.length === 0,
          })}
          onClick={handlerClearAllClick}
        >
          Clear completed
        </button>
      </footer>
    );
  },
);
