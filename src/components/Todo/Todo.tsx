import React, { useContext, useEffect, useRef, useState } from 'react';
import { Todo as TodoType } from '../../type';
import classNames from 'classnames';
import { DispatchContext } from '../../Store';

type Props = {
  todo: TodoType;
};

export const Todo: React.FC<Props> = ({ todo }) => {
  const [changedValue, setChangedValue] = useState(todo.title);
  const [isChanged, setIsChanged] = useState(false);
  const dispatch = useContext(DispatchContext);
  const editingField = useRef<HTMLInputElement>(null);

  const isCompleted = () => {
    dispatch({ type: 'markCompleted', id: todo.id });
  };

  const removeTodo = () => {
    dispatch({ type: 'removeTodo', id: todo.id });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangedValue(e.target.value);
  };

  const cancelEditing = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      dispatch({ type: 'updateTodo', id: todo.id, title: todo.title });
      setIsChanged(prev => !prev);

      return;
    }
  };

  useEffect(() => {
    if (isChanged && editingField.current) {
      editingField.current.focus();
    }
  }, [isChanged]);

  const handleUpdateTodo = () => {
    if (changedValue.length > 1) {
      dispatch({ type: 'updateTodo', id: todo.id, title: changedValue.trim() });
    } else {
      removeTodo();
    }

    setIsChanged(prev => !prev);
  };

  return (
    <>
      <div
        data-cy="Todo"
        className={classNames('todo', { completed: todo.completed })}
      >
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            onChange={isCompleted}
            className="todo__status"
            checked={todo.completed}
          />
        </label>

        {/* This form is shown instead of the title and remove button */}
        {isChanged ? (
          <form onSubmit={handleUpdateTodo}>
            <input
              ref={editingField}
              data-cy="TodoTitleField"
              type="text"
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              onChange={handleChange}
              onKeyDown={cancelEditing}
              value={changedValue}
              onBlur={handleUpdateTodo}
            />
          </form>
        ) : (
          <>
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() => setIsChanged(prev => !prev)}
            >
              {todo.title}
            </span>

            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={removeTodo}
            >
              ×
            </button>
          </>
        )}
      </div>
    </>
  );
};
