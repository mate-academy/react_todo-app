import { useContext } from 'react';
import { TodosContext } from '../context/ToDoContext';
import { TodoFilter } from './TodosFilter';

export const Footer: React.FC = () => {
  const {
    todos,
    handleClearCompleted,
  } = useContext(TodosContext);

  const filteredTodos = todos.filter(todo => todo.completed);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todos.filter(todo => !todo.completed).length} items left`}
      </span>

      <TodoFilter />

      {!!filteredTodos.length && (
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
