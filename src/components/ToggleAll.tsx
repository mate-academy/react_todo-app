import React, {
  useContext, useState, useRef, useEffect,
} from 'react';
import { StateContext, DispatchContext } from './Store';
import { ActionType } from '../Type/Type';

export const ToggleAll : React.FC = () => {
  const state = useContext(StateContext);
  const [checkbox, setCheckbox] = useState(false);
  const dispatch = useContext(DispatchContext);
  const checkedAllTodo = useRef<HTMLInputElement>(null);
  const handeltAll = ():void => {
    setCheckbox(checked => {
      dispatch({ type: ActionType.toggleAll, payload: !checked });

      return !checked;
    });
  };

  useEffect(() => {
    setCheckbox(!state.some(elem => elem.completed === false)
    && state.length > 0);
  }, [state]);

  return (
    <div>
      <input
        checked={checkbox}
        ref={checkedAllTodo}
        readOnly
        onClick={handeltAll}
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
      />

      <label htmlFor="toggle-all">Mark all as complete</label>
    </div>

  );
};
