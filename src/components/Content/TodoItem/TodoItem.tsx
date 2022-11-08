import React from 'react';
import classNames from 'classnames';
import { TodoTitleField } from '../TodoTitleField';
import { Todo } from '../../../types/Todo';

type Props = {
  todo: Todo;
  isAdding: boolean;
  isProcessed: number[];
  onUpdate: (todoId: number, data: {}) => void;
  onDelete: (todoId: number) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  isAdding,
  isProcessed,
  onUpdate,
  onDelete,
}) => {
  const { id, completed } = todo;

  return (
    <div
      data-cy="Todo"
      className={classNames(
        'todo',
        { completed },
      )}
      key={id}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          defaultChecked={completed}
          disabled={isProcessed.includes(id)}
          onClick={() => onUpdate(id, { completed: !completed })}
        />
      </label>

      <TodoTitleField
        todo={todo}
        isAdding={isAdding}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />

      <div
        data-cy="TodoLoader"
        className={classNames(
          'modal overlay',
          { 'is-active': id === 0 || isProcessed.includes(id) },
        )}
      >
        <div
          className="
            modal-background
            has-background-white-ter"
        />

        <div className="loader" />
      </div>
    </div>
  );
};
