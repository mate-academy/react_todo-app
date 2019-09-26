import React from 'react';

const TodoList = ({
  todos,
  toggleTodoCompleteness,
  removeTodo,
}) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <li className={todo.completed ? 'completed' : ''}>
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            checked={todo.completed}
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

export default TodoList;
