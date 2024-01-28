import { useContext } from 'react';
import './footer.css';
import { TodosFilter } from '../TodosFilter/TodosFilter';
import { TodoUpdateContext, TodosContext } from '../../context/TodosContext';

export const Footer: React.FC = () => {
  const { todos } = useContext(TodosContext);
  const { clearCompleted } = useContext(TodoUpdateContext);

  const vissible = todos.some(todo => todo.completed);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todos.filter(todo => !todo.completed).length} items left`}
      </span>

      <TodosFilter />

      {vissible && (
        <button
          type="button"
          className="clear-completed"
          onClick={clearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
