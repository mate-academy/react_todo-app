import { FC } from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo,
  handleChange: (id: number) => void,
};

export const TodoItem: FC<Props> = ({ todo, handleChange }) => {
  const getTodoClass = (completeStatus: boolean) => {
    if (completeStatus) {
      return 'completed';
    }

    return '';
  };

  return (
    <li
      key={todo.id}
      className={getTodoClass(todo.completed)}
    >
      <div className="view">
        <input
          type="checkbox"
          checked={todo.completed}
          className="toggle"
          id={`${todo.id}input`}
          onChange={() => handleChange(todo.id)}
        />

        <label htmlFor={`${todo.id}input`}>{todo.title}</label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="Delete todo"
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};
