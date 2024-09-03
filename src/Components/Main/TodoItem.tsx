import React from 'react';
import cn from 'classnames';
import { Todo } from '../../Types/todo';

type Props = {
  todo: Todo;
  handleChange: (todoId: number, todoCompleted: boolean) => void;
  deleteTodo: (id: number) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  handleChange,
  deleteTodo,
}) => {
  return (
    <li className={cn({ completed: todo.completed })}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle active"
          checked={todo.completed}
          onChange={() => handleChange(todo.id, todo.completed)}
          id={todo.id.toString()}
        />
        <label>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          onClick={() => deleteTodo(todo.id)}
          data-cy="deleteTodo"
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};
