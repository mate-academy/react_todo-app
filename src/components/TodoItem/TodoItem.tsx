import React from 'react';
import { useDispatch } from 'react-redux';
import { Todo } from '../../react-app-env';
import { deleteTodo, toggleTodoAction } from '../../store';

interface Props {
  todo: Todo,
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useDispatch();

  return (
    <li className={todo.completed ? 'completed' : ''}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={String(todo.id)}
          checked={todo.completed}
          onChange={() => {
            dispatch(toggleTodoAction(todo.id));
          }}
        />
        <label
          htmlFor={String(todo.id)}
        >
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          aria-label="delete todo"
          data-cy="deleteTodo"
          onClick={() => dispatch(deleteTodo(todo.id))}
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};
