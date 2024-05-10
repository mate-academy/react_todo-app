import React, { useContext, useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';
import { DispatchContext } from '../../TodoContext';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const [isChanged, setIsChanged] = useState(false);
  const dispatch = useContext(DispatchContext);
  const [title, setTitle] = useState(todo.title);
  const editingField = useRef<HTMLInputElement>(null);

  const removeTodo = () => {
    dispatch({ type: 'removeTodo', id: todo.id });
  };

  const markComplete = () => {
    dispatch({ type: 'markComplete', id: todo.id });
  };

  const changeTodo = () => {
    if (title.length >= 1) {
      dispatch({ type: 'changeTodo', id: todo.id, title: title.trim() });
    } else {
      removeTodo();
    }

    setIsChanged(prev => !prev);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const cancelChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      dispatch({ type: 'changeTodo', id: todo.id, title: todo.title });
      setIsChanged(current => !current);
    }
  };

  useEffect(() => {
    if (isChanged && editingField.current) {
      editingField.current.focus();
    }
  }, [isChanged]);

  return (
    <>
      <div
        data-cy="Todo"
        className={cn('todo', {
          completed: todo.completed,
        })}
      >
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            onChange={markComplete}
            checked={todo.completed}
          />
        </label>
        {isChanged ? (
          <form onSubmit={changeTodo}>
            <input
              ref={editingField}
              data-cy="TodoTitleField"
              type="text"
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              value={title}
              onChange={handleChange}
              onBlur={changeTodo}
              onKeyDown={cancelChange}
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
