import React, { useContext } from 'react';
import classNames from 'classnames';
import { TodosContext } from '../TodosContext';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
  togLeTodo: (id: number) => void;
};

export const TodoItem:React.FC<Props> = ({ todo, togLeTodo }) => {
  const {
    handleDelete,
    handleInputChange,
  } = useContext(TodosContext);

  return (
    <li key={todo.id}>
      <div className={classNames(
        'view',
        {
          completed: todo.completed,
        },
      )}
      >
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={todo.completed}
          onChange={() => togLeTodo(todo.id)}
        />
        <label htmlFor="toggle">{todo.title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => {
            handleDelete(todo.id);
          }}
        />
      </div>
      <input
        type="text"
        className="edit"
        onChange={() => handleInputChange(todo)}
      />
    </li>
  );
};
