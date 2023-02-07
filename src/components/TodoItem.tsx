/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
  onDeleteTodo: (id: number) => void;
  onCompleted: (id: number) => void;
  onRenameTodo: (id: number, newTitle: string) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  onDeleteTodo,
  onCompleted,
  onRenameTodo,
}) => {
  const { id, title, completed } = todo;
  const [todoTitle, setTodoTitle] = useState(todo.title);
  const [isEditSelctedTitleTodo, setIsEditSelctedTitleTodo] = useState(false);

  const onSetTodoTitle = useCallback(() => {
    setIsEditSelctedTitleTodo(false);
    if (title !== todoTitle) {
      onRenameTodo(id, todoTitle);
    }
  }, [todoTitle]);

  const onEditTitleOnKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Escape') {
        setIsEditSelctedTitleTodo(false);
        setTodoTitle(title);
      }

      if (event.key === 'Enter') {
        setIsEditSelctedTitleTodo(false);
        onSetTodoTitle();
      }
    }, [todoTitle],
  );

  return (
    <li
      className={classNames(
        {
          completed,
          editing: isEditSelctedTitleTodo,
        },
      )}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={completed}
          onChange={() => onCompleted(id)}
        />
        <label onDoubleClick={() => setIsEditSelctedTitleTodo(true)}>
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => onDeleteTodo(id)}
        />
      </div>
      {isEditSelctedTitleTodo && (
        <input
          type="text"
          className="edit"
          value={todoTitle}
          onChange={event => setTodoTitle(event.target.value)}
          onBlur={onSetTodoTitle}
          onKeyDown={onEditTitleOnKeyDown}
          ref={input => input && input.focus()}
        />
      )}
    </li>
  );
};
