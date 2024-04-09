import React, { useContext } from 'react';
import { TodosFilter } from './TodosFilter';
import { TodosContext } from './TodosContext';

export const TodoFooter: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const handleClickCompleted = () => {
    const newTodos = todos.filter(item => !item.completed);

    setTodos(newTodos);
  };

  const notCompletedTodos = todos.filter(item => !item.completed);

  const completedTodos = todos.some(item => item.completed);

  return (
    <footer className="footer" data-cy="todosFilter">
      <span className="todo-count" data-cy="todosCounter">
        {`${notCompletedTodos.length} item${notCompletedTodos.length !== 1 ? 's' : ''} left`}
      </span>

      <TodosFilter />

      {completedTodos && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleClickCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
