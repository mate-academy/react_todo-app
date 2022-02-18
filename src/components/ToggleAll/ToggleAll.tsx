import React, { useContext } from 'react';
import { TodosContext } from '../../TodosContext';

export const ToggleAll: React.FC = () => {
  const todos = useContext(TodosContext)?.todos;
  const toggleAll = useContext(TodosContext)?.toggleAll;
  const handlerToggleAll = useContext(TodosContext)?.handlerToggleAll;

  return (
    <>
      {handlerToggleAll && (
        <>
          <input
            disabled={todos === null}
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            checked={toggleAll === 'allCompleted'}
            onChange={() => {
              handlerToggleAll();
            }}
          />
          <label htmlFor="toggle-all">
            {}
          </label>
        </>
      )}
    </>
  );
};
