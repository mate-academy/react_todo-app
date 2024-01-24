import { useContext } from 'react';
import './footer.css';
import { Filters } from '../filters/Filters';
import { TodosContext } from '../../context/TodosContext';

export const Footer: React.FC = () => {
  const { todos } = useContext(TodosContext);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todos.filter(todo => !todo.completed).length} items left`}
      </span>

      <Filters />

      <button type="button" className="clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
