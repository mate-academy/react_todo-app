import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { TodosContext } from '../../TodosContext';

export const TodoItem = ({ id, title, completed }) => {
  const { todos, setTodos } = useContext(TodosContext);

  const handleTodoComplete = () => {
    setTodos(todos.map(todo => (
      (todo.id !== id)
        ? todo
        : {
          ...todo,
          completed: !todo.completed,
        }
    )));
  };

  const handleDeleteTodo = () => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <li key={id} className={`${completed ? 'completed' : ''}`}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          onChange={handleTodoComplete}
        />
        <label>{title}</label>
        <button type="button" className="destroy" />
      </div>
      <input
        type="text"
        className="edit"
        onChange={handleDeleteTodo}
      />
    </li>
  );
};

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};
