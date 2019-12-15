import React from 'react';
import PropTypes from 'prop-types';

const TodoList = ({ todos, setTodoCompleted, removeTodo }) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <li className="">
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            onClick={() => setTodoCompleted(todo.id)}
            checked={todo.completed}
          />
          <label>{todo.title}</label>
          <button
            onClick={() => removeTodo(todo.id)}
            type="button"
            className="destroy"
          />
        </div>
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setTodoCompleted: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
};

export default TodoList;
