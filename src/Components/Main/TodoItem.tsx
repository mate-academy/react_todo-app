import React, { useContext, useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../Types/todo';
import { TodoContext } from '../Context/TodoContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { deleteTodo, handleChange, onTitleChange } = useContext(TodoContext);

  const [isEdit, setIsEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value)
  }

  const handleBlur = () => {
    setIsEdit(false);

    if (newTitle.trim() !== '') {
      onTitleChange(todo.id, newTitle.trim())
    } else {
      setNewTitle(todo.title);
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleBlur();
    }

    if (event.key === 'Escape') {
      setNewTitle(todo.title)
      setIsEdit(false)
    }
  }

  return (
    <li className={cn('todo-list', { 'completed': todo.completed, 'edit': isEdit }, )}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle active"
          checked={todo.completed}
          onChange={() => handleChange(todo.id, todo.completed)}
          id={todo.id.toString()}
        />

        {isEdit ? (
          <input
            type="text"
            className="new-todo"
            value={newTitle}
            onChange={handleTitleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          ) : (
            <label onDoubleClick={() => setIsEdit(true)}>{todo.title}</label>
        )}

        <button
          type="button"
          className="destroy"
          onClick={() => deleteTodo(todo.id)}
          data-cy="deleteTodo"
        />
      </div>
    </li>
  );
};
