/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { useContext } from 'react';
import { TodosContext } from '../contexts/TodosContext';

export const TodoCount: React.FC = () => {
  const { todos } = useContext(TodosContext);
  const todosLeft = todos.filter(todo => !todo.completed).length;

  return (
    <span className="todo-count" data-cy="todosCounter">
      {`${todosLeft} items left`}
    </span>
  );
};
