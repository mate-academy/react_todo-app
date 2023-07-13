import React, { useCallback, useContext, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoEditForm } from './TodoEditForm/TodoEditForm';
import { TodoListContext } from '../../context/TodoListContext';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = React.memo(({
  todo,
}) => {
  const { id, title, completed } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [todoTitle, setTodoTitle] = useState(title);

  const {
    handleToggleButtonClick,
    handleRemoveButtonClick,
  } = useContext(TodoListContext);

  const handleDoubleClick = useCallback(() => {
    setTodoTitle(title);
    setIsEditing(true);
  }, [todo]);

  const exitEditionMode = useCallback(() => {
    setIsEditing(false);
  }, []);

  const handleToggle = useCallback(() => {
    handleToggleButtonClick(id, !completed);
  }, [id, completed]);

  const handleRemove = useCallback(() => {
    handleRemoveButtonClick(id);
  }, [handleRemoveButtonClick, id]);

  return (
    <div className={classNames('todo', { completed })}>
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          defaultChecked={completed}
          onClick={handleToggle}
        />
      </label>

      {isEditing ? (
        <TodoEditForm
          todoId={id}
          todoTitle={todoTitle}
          exitEditionMode={exitEditionMode}
        />
      ) : (
        <>
          <span
            className="todo__title"
            onDoubleClick={handleDoubleClick}
          >
            {title}
          </span>

          <button
            type="button"
            className="todo__remove"
            onClick={handleRemove}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
});
