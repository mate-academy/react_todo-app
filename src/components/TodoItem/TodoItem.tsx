import React, { useContext } from 'react';
import { TodoContext } from '../TodoContext/TodoContext';

type Props = {};

export const TodoItem: React.FC<Props> = () => {
  const { todos } = useContext(TodoContext);

  return (
    {todos.map(todo => (
      <div data-cy="Todo" className="todo" key={todo.id}>
        <label className="todo__status-label">
          <input data-cy="TodoStatus" type="checkbox" className="todo__status" />
        </label>

      {true ? (
        <span data-cy="TodoTitle" className="todo__title">
          {todo.title}
        </span>
      ) : (
        <input
          data-cy="TodoTitleField"
          type="text"
          className="todo__title-field"
          placeholder="Empty todo will be deleted"
          value="Todo is being edited now"
        />
      )}

      <button type="button" className="todo__remove" data-cy="TodoDelete">
        ×
      </button>
    </div>
      ))}

  );
};
