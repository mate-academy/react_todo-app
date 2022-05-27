import React from 'react';

const TodosCounter: React.FC<TodosCounterProps> = ({ todos }) => {
  const numberOfActiveTodos = todos
    .filter(todo => todo.completed === false).length;

  return (
    <span data-cy="todosCounter" className="todo-count">
      {`${numberOfActiveTodos} ${numberOfActiveTodos === 1 ? 'item' : 'items'} left`}
    </span>

  );
};

export default TodosCounter;
