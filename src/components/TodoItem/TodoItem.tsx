/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
import React from 'react';
import { Todo } from '../../types/Todo';

type TodoItemProps = {
  todo: Todo;
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
};

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggleTodo,
  onDeleteTodo,
}) => {
  const handleToggleTodo = () => {
    onToggleTodo(todo.id);
  };

  const handleDeleteTodo = () => {
    onDeleteTodo(todo.id);
  };

  return (
    <li className={todo.completed ? 'completed' : ''}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={handleToggleTodo}
        />
        <label>{todo.title}</label>
        <button className="destroy" onClick={handleDeleteTodo} />
      </div>
    </li>
  );
};
