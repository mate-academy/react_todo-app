import React from 'react';
import cn from 'classnames';
import { Todo } from '../../Types/todo';

type Props = {
  todo: Todo;
  handleChange: (todoId: number, todoCompleted: boolean) => void;
}

export const TodoItem: React.FC<Props> = ({ todo, handleChange}) => {
  return (
    <li
      className={cn({ 'completed': todo.completed })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle active"
          checked={todo.completed}
          onChange={() =>handleChange(todo.id, todo.completed)}
          id={todo.id.toString()}
        />
        <label>
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
}
