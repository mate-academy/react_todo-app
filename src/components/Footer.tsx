import { useContext } from 'react';
import { TodosContext } from '../context/ToDoContext';
import { TodoFilter } from './TodosFilter';

export const Footer: React.FC = () => {
  const {
    todos,
    handleClearCompleted,
  } = useContext(TodosContext);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todos.filter(todo => !todo.completed).length} items left`}
      </span>

      <TodoFilter />

      {todos.filter(todo => todo.completed).length > 0 && (
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
