import React, { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { removeTodo } from '../api/api';
import { changeTodo } from '../api/api';

export const TodoItem = ({ todo, updateTodos }) => {
  const [checkedTodo, setCheckedTodo] = useState(todo.completed);
  const [isEdit, setEdit] = useState('');
  const [newTitle, setNewTitle] = useState(todo.title);

  useEffect(() => {
    setCheckedTodo(todo.completed);
  }, [todo]);

  const toggleCheck = async() => {
    await changeTodo(todo.id, {completed: !todo.completed,});
    updateTodos();
  };

  const funcRemoveTodo = async() => {
    await removeTodo(todo.id);
    updateTodos();
  };

  let nameInput = useRef(null);

  const editTodo = () => {
    setEdit('editing');
    setTimeout(() => nameInput.current.focus(), 0);
  };

  const handleChange = ({ target }) => {
    setNewTitle(target.value);
  };

  const saveTitle = async({ target }) => {
    if (!isEdit) {
      return;
    }

    if (!target.value.trim()) {
      await removeTodo(todo.id);
      updateTodos();

      return;
    }

    await changeTodo(todo.id, { title: target.value });
    setEdit('');
    updateTodos();
  };

  const checkKey = (e) => {
    if (e.keyCode === 13) {
      saveTitle(e);
    } else if (e.keyCode === 27) {
      setEdit('');
    }
  };

  return (
    <li
      className={`${checkedTodo ? 'completed' : ''} ${isEdit}`}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={checkedTodo}
          onChange={toggleCheck}
        />
        <label onDoubleClick={editTodo}>{todo.title}</label>
        <button type="button" className="destroy" onClick={funcRemoveTodo} />
      </div>
      <input
        type="text"
        className="edit"
        ref={nameInput}
        onChange={handleChange}
        value={newTitle}
        onBlur={saveTitle}
        onKeyDown={checkKey}
      />
    </li>
  );
};