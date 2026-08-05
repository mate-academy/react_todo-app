import { TodoFilter } from '../TodoFilter';
import './TodoFooter.scss';

export const TodoFooter = () => {
  return (
    <footer className="todo-footer" data-cy="Footer">
      <span className="todo-footer_count" data-cy="TodosCounter">
        3 items left
      </span>

      {/* Active link should have the 'selected' class */}
      <TodoFilter />

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todo-footer__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
