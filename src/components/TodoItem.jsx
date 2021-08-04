import React, { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import classNames from 'classnames';
import { removeTodo } from '../api/api';
import { changeTodo } from '../api/api';

export const TodoItem = ({ todo, setTodos }) => {
  const [checkedTodo, setCheckedTodo] = useState(todo.completed);
  const [isEdit, setEdit] = useState('');
  const [newTitle, setNewTitle] = useState(todo.title);

  useEffect(() => {
    setCheckedTodo(todo.completed);
  }, [todo]);

  const toggleCheck = async() => {
    await changeTodo(todo.id, {completed: !todo.completed,})
      .then((response) => {
        if (response.data) {
          setTodos(list => [...list].map((item) => {
            if (item.id === todo.id) {
              return {
                ...item,
                completed: !todo.completed,
              };
            }

            return item;
          }));
        }
      });
  };

  const funcRemoveTodo = async() => {
    await removeTodo(todo.id)
      .then((response) => {
        if (response.data) {
          setTodos(list => [...list.filter(item => item.id !== todo.id)]);
        }
      });
  };

  const nameInput = useRef(null);

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
      await removeTodo(todo.id)
        .then((response) => {
          if (response.data) {
            setTodos(list => list.filter(item => item.id !== todo.id));
          }
        });

      return;
    }

    await changeTodo(todo.id, { title: target.value })
      .then((response) => {
        if (response.data) {
          setTodos(list => list.map((item) => {
            if (item.id === todo.id) {
              return {...item, title: target.value,};
            }

            return item;
          })
          )
        }
      });
    setEdit('');
  };

  const checkKey = (e) => {
    const [enterKey, escKey] = [13, 27];

    if (e.keyCode === enterKey) {
      saveTitle(e);
    } else if (e.keyCode === escKey) {
      setEdit('');
    }
  };

  const liClass = classNames({
    completed: checkedTodo,
    [isEdit]: isEdit,
  });

  return (
    <li
      className={liClass}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={checkedTodo}
          onChange={toggleCheck}
        />
        <label onDoubleClick={editTodo}>{todo.title}</label>
        <button
          type="button"
          className="destroy-btn"
          onClick={funcRemoveTodo}
        />
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
