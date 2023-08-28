import { TodosFilter } from '../TodosFilter';
import { useTodosContext } from '../../context';

export const Footer = () => {
  const { deleteTodo, todos } = useTodosContext();
  const counterActive = todos.filter(todo => !todo.completed).length || 0;
  const counterCompleted = todos.filter(todo => todo.completed).length || 0;

  const handleClearCompleted = () => {
    todos.forEach(todo => {
      if (todo.completed) {
        deleteTodo(todo.id);
      }
    });
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${counterActive} items left`}
      </span>

      <TodosFilter />
      {counterCompleted > 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={() => {
            handleClearCompleted();
          }}
        >
          Clear completed
        </button>
      )}

    </footer>
  );
};
