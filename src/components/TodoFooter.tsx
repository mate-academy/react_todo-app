import { useContext } from 'react';
import { TodosContext } from '../services/Store';
import { TodosFilter } from './TodosFilter';

export const TodoFooter: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const completedTodosCount = todos.filter(todo => todo.completed).length;
  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  const handleClearComleted = () => {
    const allCompleted = todos.filter(todo => !todo.completed);

    setTodos(allCompleted);
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {activeTodosCount === 1
          ? `${activeTodosCount} item left`
          : `${activeTodosCount} items left`}
      </span>

      <TodosFilter />

      {
        completedTodosCount && (
          <button
            type="button"
            className="clear-completed"
            onClick={handleClearComleted}
          >
            Clear completed
          </button>
        )
      }
    </footer>
  );
};
