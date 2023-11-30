import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { Status } from '../types/Filter';
import { DispatchContex } from './TodosContext';

export const TodosFilter: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState(Status.all);
  const dispatch = useContext(DispatchContex);

  const chooseStatus = (status: Status) => {
    switch (status) {
      case Status.activ:
        dispatch({ type: 'filter', payload: Status.activ });
        setFilterStatus(Status.activ);
        break;

      case Status.completed:
        dispatch({ type: 'filter', payload: Status.completed });
        setFilterStatus(Status.completed);
        break;

      default:
        dispatch({ type: 'filter', payload: Status.all });
        setFilterStatus(Status.all);
        break;
    }
  };

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={classNames({ selected: filterStatus === Status.all })}
          onClick={event => {
            event.preventDefault();

            return chooseStatus(Status.all);
          }}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({ selected: filterStatus === Status.activ })}
          onClick={event => {
            event.preventDefault();

            return chooseStatus(Status.activ);
          }}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={
            classNames({ selected: filterStatus === Status.completed })
          }
          onClick={event => {
            event.preventDefault();

            return chooseStatus(Status.completed);
          }}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
