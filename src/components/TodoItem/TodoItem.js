import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classname';

import { TodoTypes } from './TodoTypes';
import { removeTodo, deleteTodo } from '../../api/api';

export const TodoItem = ({ todo, onSetTodos }) => {
  const [editingTodoId, setIsEditingTodoId] = useState(0);
  const [title, setTitle] = useState(todo.title);

  const myRef = useRef();

  useEffect(() => {
    myRef.current.focus();
  }, [editingTodoId]);

  const handleCompletedTodo = (event) => {
    event.persist();
    removeTodo(todo.id, 'completed', event.target.checked);
    onSetTodos(prevTodos => prevTodos.map(
      item => (item.id === todo.id
        ? ({
          ...item,
          completed: event.target.checked,
        })
        : item),
    ));
  };

  const handleDeleteTodo = (todoId) => {
    deleteTodo(todoId);
    onSetTodos(prevTodos => prevTodos.filter(
      item => item.id !== todoId,
    ));
  };

  const handleEditTodo = (event) => {
    if (event.key === 'Enter') {
      event.persist();
      editSelectedTodo();
    }

    if (event.key === 'Escape') {
      setIsEditingTodoId(0);
    }
  };

  const editSelectedTodo = () => {
    if (title) {
      removeTodo(todo.id, 'title', title);
      onSetTodos(prevTodos => prevTodos.map(
        item => (item.id === todo.id ? {
          ...item,
          title,
        } : item),
      ));
    }

    setIsEditingTodoId(0);
  };

  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing: (editingTodoId === todo.id),
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={handleCompletedTodo}
        />
        <label
          onDoubleClick={() => setIsEditingTodoId(todo.id)}
        >
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          onClick={handleDeleteTodo}
        />
      </div>
      <input
        type="text"
        ref={myRef}
        className="edit"
        value={title}
        onChange={event => setTitle(event.target.value)}
        onKeyDown={handleEditTodo}
        onBlur={editSelectedTodo}
      />
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape(TodoTypes).isRequired,
  onSetTodos: PropTypes.func.isRequired,
};
