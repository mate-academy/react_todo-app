import { useContext } from 'react';
import { TodosContext } from '../TodosContext/TodosContext';
import { TodosFilter } from './TodosFilter';

export const TodosFooter: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const completedTodos = todos.filter(todo => todo.completed === true).length;

  const clearCompleted = () => {
    setTodos(todos.filter(todo => todo.completed !== true));
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${completedTodos} items left`}
      </span>

      <TodosFilter />

      {completedTodos > 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={() => clearCompleted()}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
