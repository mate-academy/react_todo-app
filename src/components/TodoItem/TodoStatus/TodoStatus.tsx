import React from 'react';
import { Todo } from '../../../types/Todo';

type Props = {
  todo: Todo;
  handleUpdateTodo?: (updatedTodo: Todo) => void;
};

export const TodoStatus: React.FC<Props> = React.memo(({
  todo,
  handleUpdateTodo = () => {},
}) => {
  const { completed } = todo;

  const handleTodoStatusChange = () => {
    handleUpdateTodo({ ...todo, completed: !completed });
  };

  return (
    <label className="todo__status-label">
      <input
        type="checkbox"
        className="todo__status"
        defaultChecked={completed}
        onChange={() => handleTodoStatusChange()}
      />
    </label>
  );
});
