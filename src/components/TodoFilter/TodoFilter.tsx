import React from 'react';
import { useDispatch } from 'react-redux';
import { ShowType } from '../../types/ShowType';
import { setShowBy } from '../../store';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <>
      <ul className="filters">
        <li>
          <button
            type="button"
            onClick={() => dispatch(setShowBy(ShowType.ALL))}
          >
            All
          </button>
        </li>

        <li>
          <button
            type="button"
            onClick={() => dispatch(setShowBy(ShowType.Uncompleted))}
          >
            Active
          </button>
        </li>

        <li>
          <button
            type="button"
            onClick={() => dispatch(setShowBy(ShowType.Completed))}
          >
            Completed
          </button>
        </li>
      </ul>

      <button type="button" className="clear-completed">
        Clear completed
      </button>
    </>
  );
};
