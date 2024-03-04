/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../Types/Todo';
import { TodosContext } from '../../Store';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { removeTodo, toggleTodo } = useContext(TodosContext);

  const [title, setTitle] = useState(todo.title);
  const [isEdit, setIsEdit] = useState(false);

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleToggleChange = () => {
    toggleTodo(todo.id);
  };

  const handleDoubleClick = () => {
    setIsEdit(true);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (title.trim().length !== 0) {
        setTitle(title);
        setIsEdit(false);
      }
    }
  };

  return (
    <li className={cn({ completed: todo.completed }, { editing: isEdit })}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={todo.completed}
          onChange={handleToggleChange}
        />
        <label htmlFor="toggle-view" onDoubleClick={handleDoubleClick}>
          {title}{' '}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => removeTodo(todo.id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={title}
        onChange={handleChangeTitle}
        onKeyUp={handleKeyUp}
      />
    </li>
  );
};
