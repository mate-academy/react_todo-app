import React, { useState } from 'react';
import { Input } from './Input';
import { ButtonClearTodo } from './ButtonClearTodo';

export const TodoItem = ({
  id,
  completed,
  title,
  handleChecked,
  deleteTodo,
  changeTodoTitle,
}) => {
  const [classOfLi, setClassOfLi] = useState('');
  const [editedTitle, setEditedTitle] = useState(title);

  const updateEditedTitle = (event) => {
    const { value } = event.target;

    setEditedTitle(value);
  };

  const pushEditedTitle = (event) => {
    if (event.keyCode === 13 && editedTitle !== '') {
      changeTodoTitle(id, editedTitle);
      setClassOfLi('');
    }

    if (event.keyCode === 27) {
      setClassOfLi('');
    }
  };

  return (
    <li
      className={classOfLi}
      onDoubleClick={() => setClassOfLi('editing')}
    >
      <div className="view">
        <Input
          id={id}
          completed={completed}
          handleChecked={handleChecked}
        />
        <label>{title}</label>
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
