import { useTodos } from '../../hooks/useTodos';
import { useTodosSetter } from '../../hooks/useTodosSetter';
import { TodoFilter } from '../TodoFilter';
import './TodoFooter.scss';

export const TodoFooter = () => {
  const todos = useTodos();
  const todosSetter = useTodosSetter();

  const completedTodosAmount = todos.filter(todo => todo.completed).length;

  const handleClearCompleted = () => {
    todosSetter(currentTodos => currentTodos.filter(todo => !todo.completed));
  };

  return (
    <footer className="todo-footer" data-cy="Footer">
      <span className="todo-footer_count" data-cy="TodosCounter">
        {todos.length - completedTodosAmount} items left
      </span>

      <TodoFilter />

      <button
        type="button"
        className="todo-footer__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={handleClearCompleted}
        disabled={completedTodosAmount === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
