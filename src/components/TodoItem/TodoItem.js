import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { TodosContext } from '../TodosContext';

export const TodoItem = ({ todo }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [editTodoId, setEditTodoId] = useState(0);
  const [editedTodoValue, setEditedTodoValue] = useState(todo.title);

  const changeTodo = property => (
    setTodos(() => (
      todos.map((todoEl) => {
        if (todoEl.id !== todo.id) {
          return todoEl;
        }

        const todoValue = property === 'title'
          ? editedTodoValue
          : !todoEl.completed;

        return {
          ...todoEl,
          [property]: todoValue,
        };
      }))));

  const deleteTodo = () => {
    setTodos(() => (
      todos.filter(todoEl => todoEl.id !== todo.id)
    ));
  };

  const saveEditedTodo = (key) => {
    if ((!editedTodoValue.trim() && key === 'Enter')
      || (!editedTodoValue.trim() && key === 'Blur')) {
      deleteTodo();
    }

    switch (key) {
      case 'Escape':
        return setEditTodoId(0);

      case 'Enter':
      case 'Blur':
        changeTodo('title');
        setEditedTodoValue(editedTodoValue.trim());

        return setEditTodoId(0);

      default:
        return todo;
    }
  };

  return (
    <li
      className={classnames({
        completed: todo.completed,
        editing: todo.id === editTodoId,
      })}
      onDoubleClick={
        () => {
          setEditTodoId(todo.id);
        }
      }
    >
      <div className="view">
        <input
          onChange={() => {
            changeTodo('completed');
          }}
          type="checkbox"
          checked={todo.completed}
          className="toggle"
        />
        <label>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          onClick={deleteTodo}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={editedTodoValue}
        onChange={({ target }) => {
          setEditedTodoValue(target.value);
        }}
        onKeyDown={({ key }) => {
          saveEditedTodo(key);
        }}
        onBlur={() => {
          saveEditedTodo('Blur');
        }}
      />
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
  }).isRequired,
};
