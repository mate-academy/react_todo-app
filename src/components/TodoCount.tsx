import React, { useContext } from 'react';
import { TodosContext } from '../contexts/TodosContext';

export const TodoCount: React.FC = () => {
  const { todos } = useContext(TodosContext);
  const todosLeft = todos.filter(todo => !todo.completed).length;

  return (
    <span className="todo-count" data-cy="todosCounter">
      {`${todosLeft} ${todosLeft === 1 ? 'item' : 'items'} left`}
    </span>
  );
};
