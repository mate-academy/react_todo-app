import { useContext } from 'react';
import { TodosContext } from '../../context/TodosContext';
import { TodosFilter } from '../TodosFilter/TodoFilter';

export const Footer = () => {
  const { todos, updateTodos } = useContext(TodosContext);

  const handleClearCompleted = () => {
    updateTodos(todos.filter(todo => todo.completed !== 'completed'));
  };

  const amountOfUncompletedTodos = todos.filter(
    todo => todo.completed !== 'completed',
  ).length;

  const amountOfCompletedTodos = todos.filter(
    todo => todo.completed === 'completed',
  ).length;

  if (todos.length === 0) {
    return null;
  }

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${amountOfUncompletedTodos} items left`}
      </span>

      <TodosFilter />

      {amountOfCompletedTodos > 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleClearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
