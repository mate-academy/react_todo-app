import React, { useState } from 'react';
import classNames from 'classnames';

export const TodoList = ({
  displayTodos,
  deleteTodo,
  changeStatusTodo,
  changeTitleTodo,
}) => {
  const [newTodoTitile, setNewTodoTitle] = useState('');
  const [isChanging, setIsChenging] = useState(0);

  const changeTitle = (event, todoId) => {
    switch (event.key) {
      case 'Enter':
        changeTitleTodo(todoId, newTodoTitile);
        setIsChenging(0);
        break;
      case 'Escape':
        setIsChenging(0);
        setNewTodoTitle('');
        break;
      default:
        break;
    }
  };

  return (
    <ul className="todo-list">
      {displayTodos.map(todo => (
        <li
          key={todo.id}
          className={classNames({
            completed: todo.completed,
            editing: isChanging === todo.id,
          })}
          onDoubleClick={(e) => {
            e.preventDefault();
            setIsChenging(todo.id);
          }}
        >
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              id={todo.id}
              checked={todo.completed}
              onChange={() => {
                changeStatusTodo(todo.id, !todo.completed);
              }}
            />
            <label
              htmlFor={todo.id}
            >
              {todo.title}
            </label>
            <button
              type="button"
              className="destroy"
              onClick={() => {
                deleteTodo(todo.id);
              }}
            />
          </div>
          <input
            type="text"
            className="edit"
            value={newTodoTitile || todo.title}
            onChange={(e) => {
              setNewTodoTitle(e.target.value.trim());
            }}
            onKeyDown={(e) => {
              changeTitle(e, todo.id);
            }}
          />

        </li>
      ))}
    </ul>
  );
};
