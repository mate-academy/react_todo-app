import './footer.css';
import { Filters } from '../filters/Filters';

// interface Props {

// }

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        3 items left
      </span>

      <Filters />

      <button type="button" className="clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
