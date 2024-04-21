import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { ToDo } from '../../types/ToDo';
import { DispatchContext } from '../../context/ToDoContext';

interface Props {
  plan: ToDo;
}

export const Todo: React.FC<Props> = ({ plan }) => {
  const [newTitle, setNewTitle] = useState(plan.title);
  const [canEdit, setCanEdit] = useState(false);
  const dispatch = useContext(DispatchContext);

  const handleStatus = () => {
    dispatch({ type: 'changeStatus', id: plan.id });
  };

  const handleRemoveToDo = () => {
    dispatch({ type: 'removeToDo', id: plan.id });
  };

  const handleChangeTitle = () => {
    if (newTitle) {
      dispatch({
        type: 'changeTitle',
        id: plan.id,
        newTitle: newTitle,
      });
    } else {
      handleRemoveToDo();
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleChangeTitle();
      setCanEdit(false);
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      setNewTitle(plan.title);
      setCanEdit(false);
    }
  };

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    handleChangeTitle();
    setCanEdit(false);
  };

  return (
    <div
      data-cy="Todo"
      className={classNames(
        'todo',
        { 'completed': plan.completed },
      )}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={plan.completed}
          onChange={handleStatus}
        />
      </label>

      {canEdit ? (
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value.trim())}
            onKeyDown={handleKeyPress}
            onBlur={handleBlur}
          />
        </form>
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() => setCanEdit(true)}
        >
          {plan.title}
        </span>
      )}

      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={handleRemoveToDo}
      >
        ×
      </button>
    </div>
  );
};
