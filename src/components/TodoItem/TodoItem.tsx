import React, { useCallback, useContext, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../../contexts/TodoContext';
import { Action } from '../../enums/Action';
import { getTodosFromLocalStorage } from '../../utils/getTodosFromLocalStorage';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { dispatch } = useContext(TodosContext);
  const [editData, setEditData] = useState({
    newName: todo.name,
    isEditing: false,
  });

  const index = getTodosFromLocalStorage().findIndex(
    (todoFromLocalStorage: Todo) => todoFromLocalStorage.id === todo.id,
  );

  const handleSubmit = useCallback(() => {
    setEditData({ ...editData, isEditing: false });
    dispatch({
      type: Action.editName,
      newName: editData.newName,
      index: index,
    });
  }, [editData]);

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.isCompleted })}
      onDoubleClick={() => setEditData({ ...editData, isEditing: true })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          defaultChecked={todo.isCompleted}
          onChange={() =>
            dispatch({ type: Action.changeIsCompleted, index: index })
          }
        />
      </label>
      {editData.isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editData.newName}
            onKeyUp={event =>
              event.key === 'Escape'
                ? setEditData({ ...editData, isEditing: false })
                : null
            }
            onBlur={() => setEditData({ ...editData, isEditing: false })}
            onChange={event => {
              setEditData({ ...editData, newName: event.target.value });
            }}
            autoFocus
          />
        </form>
      ) : (
        <>
          <span data-cy="TodoTitle" className="todo__title">
            {todo.name}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => {
              dispatch({ type: Action.removeTodo, index: index });
            }}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
