import React, { useState } from 'react';

import './TodoItem.scss';
import classNames from 'classnames';

import { ITodo } from '../types/ITodo';
import { useTodos } from './hooks/useTodos';

export const TodoItem: React.FC<ITodo> = ({ id, title, completed }) => {
  const [editingTodo, setEditingTodo] = useState(false);
  const [initialTitle, setInitialTitle] = useState(title);
  const [updatedTitle, setUpdatedTitle] = useState(initialTitle);

  const content = useTodos();
  const todos = content?.todos;
  const setTodos = content?.setTodos;

  const removeTodo = (todoId: number): void => {
    if (todos && setTodos) {
      setTodos(todos.filter(todo => todo.id !== todoId));
    }
  };

  const toggleTodo = (todoId: number): void => {
    if (todos && setTodos) {
      setTodos(todos.map(todo => {
        if (todo.id === todoId) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      }));
    }
  };

  const editTodo = (todoId: number): void => {
    if (todos && setTodos) {
      setTodos(todos.map(todo => {
        if (todo.id === todoId) {
          return {
            ...todo,
            title: updatedTitle,
          };
        }

        return todo;
      }));
    }
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setUpdatedTitle(e.target.value.trim());
  };

  const handleBlur = () => {
    setUpdatedTitle(initialTitle);
    setEditingTodo(false);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        setInitialTitle(updatedTitle);
        setEditingTodo(false);
        editTodo(id);
        break;

      case 'Escape':
        setUpdatedTitle(initialTitle);
        setEditingTodo(false);
        break;

      default:
        setEditingTodo(true);
    }
  };

  return (
    <li className="todo-item">
      <div className="todo-item__part">
        <input
          id={id.toString()}
          type="checkbox"
          checked={completed}
          onChange={() => toggleTodo && toggleTodo(id)}
          className="todo-item__checkbox"
        />

        {editingTodo ? (
          <input
            type="text"
            value={updatedTitle}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            onBlur={handleBlur}
            className="todo-item__input input"
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
          />
        ) : (
          <label htmlFor={id.toString()}>
            <p className={classNames('todo-item__title',
              { 'todo-item__title--completed': completed })}
            >
              {initialTitle}
            </p>
          </label>
        )}
      </div>

      <div className="todo-item__part">
        <button
          type="button"
          onClick={() => setEditingTodo(true)}
          className="todo-item__button button is-info is-small"
          disabled={editingTodo}
        >
          <i className="fas fa-pencil" />
        </button>
        <button
          type="button"
          onClick={() => removeTodo && removeTodo(id)}
          className="todo-item__button button is-small is-danger"
        >
          <i className="fas fa-trash" />
        </button>
      </div>
    </li>
  );
};
