import React, { useState } from 'react';
import { useGlobalState } from '../castomHuks/useGlobalState';
import { Actions } from '../types/Actions';
import classNames from 'classnames';
import { useDispatch } from '../castomHuks/useDispatch';
import { filteredTodos } from '../utils/filteredTodos';
import { FooterButton } from './FooterButton';
import { SelectedState } from '../types/SelectedState';

export const Footer: React.FC = () => {
  const [selected, setSelected] = useState<SelectedState>({
    all: true,
    active: false,
    completed: false,
  });
  const { todos } = useGlobalState();
  const dispatch = useDispatch();

  const handleSelected = (action: Actions) => {
    setSelected(prevState => {
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
        {`${filteredTodos(todos, Actions.ACTIVE).length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(Actions).map((action, index) => {
          const upperAction =
            action.slice(0, 1).toUpperCase() + action.slice(1);

          return (
            <a
              href="#/"
              className={classNames('filter__link', {
                selected: selected[action],
              })}
              data-cy={`FilterLink${upperAction}`}
              key={index}
              onClick={() => handleSelected(action)}
            >
              {upperAction}
            </a>
          );
        })}
      </nav>

      <FooterButton />
    </footer>
  );
};
