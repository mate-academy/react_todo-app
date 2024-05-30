import cn from 'classnames';
import { DispatchContext, Todo, Type } from '../todoStorage';
import React, { useContext, useState, useRef, useEffect } from 'react';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useContext(DispatchContext);
  const [title, setTitle] = useState(todo.title);
  const [isEdit, setIsEdit] = useState(false);
  const titleField = useRef<HTMLInputElement>(null);

  const handleTodoDelete = () => {
    dispatch({
      type: Type.Remove,
      id: todo.id,
    });
  };

  const changeTodo = () => {
    if (title.length >= 1) {
      dispatch({
        type: Type.Edit,
        id: todo.id,
        text: title.trim(),
      });
    } else {
      handleTodoDelete();
    }

    setIsEdit(prev => !prev);
  };

  const handleToggleChacked = () => {
    dispatch({
      type: Type.Toggle,
      id: todo.id,
    });
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      dispatch({
        type: Type.Edit,
        id: todo.id,
        text: todo.title,
      });
      setIsEdit(prev => !prev);
    }
  };

  useEffect(() => {
    if (isEdit && titleField.current) {
      titleField.current.focus();
    }
  }, [isEdit]);

  return (
    <div data-cy="Todo" className={cn('todo', { completed: todo.completed })}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={handleToggleChacked}
        />
      </label>

      {isEdit ? (
        <form onSubmit={changeTodo}>
          <input
            ref={titleField}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={title}
            onChange={handleTitleChange}
            onKeyDown={handleKeyPress}
            onBlur={changeTodo}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setIsEdit(prev => !prev)}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => handleTodoDelete()}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
