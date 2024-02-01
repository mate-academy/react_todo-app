import { useContext } from 'react';
import { TodosContext } from '../TodosContext/TodosContext';
import { TodosFilter } from '../TodosFilter';

export const Footer: React.FC = () => {
  const { allTodos, handleClearCompleted } = useContext(TodosContext);

  const someCompleted = allTodos.some(todo => todo.completed);
  const notCompleted = allTodos.filter(todo => !todo.completed);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {notCompleted.length === 1
          ? '1 item left'
          : `${notCompleted.length} items left`}
      </span>

      <TodosFilter />

      {someCompleted && (
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
