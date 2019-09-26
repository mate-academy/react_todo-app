import React from 'react';
import { TodoListPropTypes } from '../../constants/proptypes';

const TodoList = ({
  todos,
  toggleTodoCompleteness,
  removeTodo,
}) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <li className={todo.isCompleted ? 'completed' : ''} key={todo.id}>
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            checked={todo.isCompleted}
            onChange={() => toggleTodoCompleteness(todo.id)}
          />
          <label className="todo">{todo.title}</label>
          <button
            type="button"
            className="destroy"
            onClick={() => removeTodo(todo.id)}
          />
        </div>
      </li>
    ))}
  </ul>
);

TodoList.propTypes = TodoListPropTypes;

export default TodoList;
