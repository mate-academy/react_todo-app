import { useTodos } from '../../context/TodosContext';
import { TodoFilter } from '../TodoFilter';

export const Footer: React.FC = () => {
  const { todos, handleDeleteCompletedTodo } = useTodos();

  const uncompletedTodos = todos.filter(todo => !todo.completed).length;
  const isCompletedTodo = todos.some(todo => todo.completed);

  return (
    <>
      {todos.length > 0 && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {uncompletedTodos} items left
          </span>
          <TodoFilter />
          {isCompletedTodo && (
            <button
              onClick={handleDeleteCompletedTodo}
              type="button"
              className="clear-completed"
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </>
  );
};
