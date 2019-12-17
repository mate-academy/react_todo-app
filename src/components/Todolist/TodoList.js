import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from '../TodoItem/TodoItem';

function TodoList({ todos, setDoneStatus, destroyTodo }) {
  return (

    <ul className="todo-list">
      {todos.map(todo => (
        <li key={todo.id}>
          <div className="view">
            <input
              onChange={() => setDoneStatus(todo.id)}
              type="checkbox"
              className="toggle"
              id={todo.id}
              checked={todo.done}
            />
            <TodoItem todoItem={todo} />
            <button
              onClick={() => destroyTodo(todo.id)}
              type="button"
              className="destroy"
            />
          </div>
          <input type="text" className="edit" />
        </li>
      ))}
    </ul>
  );
}

export default TodoList;

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  setDoneStatus: PropTypes.func.isRequired,
  destroyTodo: PropTypes.func.isRequired,
};
