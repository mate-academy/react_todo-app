import cn from 'classnames';
import React, { useContext } from 'react';
import { GlobalContextController }
  from '../GlobalStateProvider';
import './style.css';
import { Status } from '../../types/Status';

export const TodosFilter: React.FC = () => {
  const { setVisibleStatus, visibleStatus }
  = useContext(GlobalContextController);

  const handleSelection = (status: Status) => {
    switch (status) {
      case Status.All:
        setVisibleStatus(Status.All);
        break;

      case Status.Active:
        setVisibleStatus(Status.Active);
        break;

      case Status.Completed:
        setVisibleStatus(Status.Completed);
        break;

      default:
        break;
    }
  };

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={cn({ selected: visibleStatus === Status.All })}
          onClick={() => handleSelection(Status.All)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={cn({ selected: visibleStatus === Status.Active })}
          onClick={() => handleSelection(Status.Active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={cn({ selected: visibleStatus === Status.Completed })}
          onClick={() => handleSelection(Status.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
