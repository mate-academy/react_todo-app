import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classname';

import { TodoTypes } from './TodoTypes';
import { removeTodo, deleteTodo } from '../../api/api';

export const Todo = ({ todo, onTodosSet }) => {
  const [editingTodoId, setIsEditingTodoId] = useState(0);
  const [title, setTitle] = useState(todo.title);

  const myRef = useRef();

  useEffect(() => {
    myRef.current.focus();
  }, [editingTodoId]);

  const handleTodoCompleted = (event) => {
    const { checked } = event.target;

    event.persist();
    removeTodo(todo.id, 'completed', checked);
    onTodosSet(prevTodos => prevTodos.map(
      item => (item.id === todo.id
        ? ({
          ...item,
          completed: checked,
        })
        : item),
    ));
  };

  const handleTodoDelete = (todoId) => {
    deleteTodo(todoId);
    onTodosSet(prevTodos => prevTodos.filter(
      item => item.id !== todoId,
    ));
  };

  const handleTodoEdit = (event) => {
    const { key } = event;

    if (key === 'Enter') {
      event.persist();
      editSelectedTodo();
    }

    if (key === 'Escape') {
      setIsEditingTodoId(0);
    }
  };

  const editSelectedTodo = () => {
    if (title) {
      removeTodo(todo.id, 'title', title);
      onTodosSet(prevTodos => prevTodos.map(
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
          onChange={handleTodoCompleted}
        />
        <label
          onDoubleClick={() => setIsEditingTodoId(todo.id)}
        >
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          onClick={() => handleTodoDelete(todo.id)}
        />
      </div>
      <input
        type="text"
        ref={myRef}
        className="edit"
        value={title}
        onChange={event => setTitle(event.target.value)}
        onKeyDown={handleTodoEdit}
        onBlur={editSelectedTodo}
      />
    </li>
  );
};

Todo.propTypes = {
  todo: PropTypes.shape(TodoTypes).isRequired,
  onTodosSet: PropTypes.func.isRequired,
};
