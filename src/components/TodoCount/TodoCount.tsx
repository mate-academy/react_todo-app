import React, { useContext, useMemo } from 'react';

import './TodoCount.scss';
import { TodosContext } from '../../contexts/TodosContext';

const TodoCount: React.FC = () => {
  const { todos } = useContext(TodosContext);

  const tasksLeft = useMemo(() => {
    return todos.reduce((counter, todo) => {
      return !todo.completed ? counter + 1 : counter;
    }, 0);
  }, [todos]);

  return (
    <span className="todo-count" data-cy="todosCounter">
      {tasksLeft}
      {' '}
      items left
    </span>
  );
};

export default TodoCount;
