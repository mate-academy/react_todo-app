import React from 'react';
import { Todo } from '../../types/Todo';
import { useTodos } from '../../store/Store';

type Props = {
  todo: Todo;
};

const TodoItem: React.FC<Props> = ({ todo }) => {
  const { deleteTodo, toggleTodo } = useTodos();
  const { title, id, completed } = todo;

  return (
    <li>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={completed}
          onChange={() => toggleTodo(id)}
        />

        <label>{title}</label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => deleteTodo(id)}
        />
      </div>

      <input type="text" className="edit" />
    </li>
  );
};

export default TodoItem;
