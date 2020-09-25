import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export const TodoItem = ({
  item,
  setTodoList,
  todoList,
}) => {
  const [status, setStatus] = useState(item.completed);
  const [editing, setEditing] = useState(false);
  const [todoText, setTodoText] = useState(item.title);

  const handleKeyDown = (key) => {
    if (key === 'Escape') {
      setTodoText(item.title);
      setEditing(false);
    }

    if (key === 'Enter') {
      handleBlur();
    }
  };

  const handleBlur = () => {
    if (!todoText) {
      deleteTodo(item.id);
      setEditing(false);
    } else {
      setTodoText(todoText.trim());
      setTodoList(prevTodos => prevTodos.map((todo) => {
        if (todo.id === item.id) {
          return { ...todo, title: todoText };
        }

        return todo;
      }));
      setEditing(false);
    }
  };

  const changeStatus = () => {
    setTodoList(prevTodos => prevTodos.map((todo) => {
      if (todo.id === item.id) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    }));
    setStatus(!status);
  };

  const deleteTodo = (itemId) => {
    setTodoList(todoList.filter(todo => todo.id !== itemId));
  };

  useEffect(() => {
    setStatus(item.completed);
    setTodoList([...todoList]);
  }, [item.completed]);

  return (
    <li className={classnames({
      completed: status,
      editing,
    })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={status}
          onChange={changeStatus}
        />
        <label
          onDoubleClick={() => setEditing(true)}
        >
          {item.title}
        </label>
        <button
          type="button"
          className="destroy"
          onClick={() => deleteTodo(item.id)}
        />
      </div>
      {editing && (
        <input
          autoFocus
          type="text"
          className="edit"
          value={todoText}
          onChange={event => setTodoText(event.target.value.trimLeft())}
          onKeyDown={event => handleKeyDown(event.key)}
          onBlur={handleBlur}
        />
      )}
    </li>
  );
};

TodoItem.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.object).isRequired,
  item: PropTypes.shape({
    completed: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  setTodoList: PropTypes.func.isRequired,
};
