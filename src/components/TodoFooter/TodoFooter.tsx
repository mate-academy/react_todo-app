import { useTodos } from '../../hooks/useTodos';
import { TodoFilter } from '../TodoFilter';
import './TodoFooter.scss';

export const TodoFooter = () => {
  const todos = useTodos();
  const completedTodosAmount = todos.filter(todo => todo.completed).length;

  const completedTodosAmount = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todo-footer" data-cy="Footer">
      <span className="todo-footer_count" data-cy="TodosCounter">
        {todos.length - completedTodosAmount} items left
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
