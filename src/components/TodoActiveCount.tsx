import React, { useContext } from 'react';
import { TodosContext } from '../context/TodosContext';

type Props = {
};

export const TodoActiveCount: React.FC<Props> = () => {
  const { todos } = useContext(TodosContext);
  const activeTasksCount = todos.filter(todo => !todo.completed).length;

  return (
    <span className="todo-count" data-cy="todosCounter">
      {`${activeTasksCount} ${activeTasksCount === 1 ? 'item' : 'items'} left`}
    </span>
  );
};
