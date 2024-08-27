import { useState } from 'react';
import { useDispatch } from '../CustomHooks/useDispatch';
import { useGlobalState } from '../CustomHooks/useGlobalState';
import { Status } from '../types/Status';
import { getFilteredTodos } from '../utils/getFilteredTodos';
import { FooterButton } from './FooterButton';
import { SelectedState } from '../types/SelectedState';
import classNames from 'classnames';

export const Footer = () => {
  const [filter, setFilter] = useState<SelectedState>({
    all: true,
    active: false,
    completed: false,
  });
  const { todos } = useGlobalState();
  const dispatch = useDispatch();

  const handleSelected = (action: Status) => {
    setFilter(prevState => {
      const newState = { ...prevState };

      for (const key in newState) {
        if (key !== action) {
          newState[key as keyof SelectedState] = false;
        } else {
          newState[key as keyof SelectedState] = true;
        }
      }

      return newState;
    });

    dispatch({ type: 'setActions', payload: action });
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${getFilteredTodos(todos, Status.ACTIVE).length} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {Object.values(Status).map((status, index) => {
          const currentAction =
            status.slice(0, 1).toUpperCase() + status.slice(1);

          return (
            <a
              href="#/"
              className={classNames('filter__link', {
                selected: filter[status],
              })}
              data-cy={`FilterLink${currentAction}`}
              key={index}
              onClick={() => handleSelected(status)}
            >
              {currentAction}
            </a>
          );
        })}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <FooterButton />
    </footer>
  );
};
