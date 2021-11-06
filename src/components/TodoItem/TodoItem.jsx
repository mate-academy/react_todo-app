import React, { useState } from 'react';
import cn from 'classnames';
import { Input } from '../Input';
import { ButtonClearTodo } from '../ButtonClearTodo';
import { TodoItemShape } from '../../shapes/TodoItemShape';
import './TodoItem.css';

export const TodoItem = ({
  id,
  completed,
  title,
  handleChecked,
  deleteTodo,
  changeTodoTitle,
}) => {
  const [todoClass, setTodoClass] = useState('');
  const [editedTitle, setEditedTitle] = useState(title);
  const lineThrough = completed;

  const updateEditedTitle = (event) => {
    const { value } = event.target;

    setEditedTitle(value);
  };

  const pushEditedTitle = (event) => {
    if (event.key === 'Enter' && editedTitle !== '') {
      changeTodoTitle(id, editedTitle);
      setTodoClass('');
    }

    if (event.key === 'Escape') {
      setTodoClass('');
    }
  };

  return (
    <li
      className={todoClass}
      onDoubleClick={() => setTodoClass('editing')}
    >
      <div className="view">
        <Input
          id={id}
          completed={completed}
          handleChecked={handleChecked}
        />
        <label
          className={cn({ 'line-through': lineThrough })}
        >
          {title}
        </label>
        <ButtonClearTodo
          id={id}
          deleteTodo={deleteTodo}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={editedTitle}
        onChange={updateEditedTitle}
        onKeyDown={pushEditedTitle}
      />
    </li>
  );
};

TodoItem.propTypes = TodoItemShape;
