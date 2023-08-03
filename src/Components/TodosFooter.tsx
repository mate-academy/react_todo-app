import { useContext } from 'react';
import { TodosContext } from '../TodosContext/TodosContext';
import { TodosFilter } from './TodosFilter';

export const TodosFooter: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const isCompletedTodos = todos.some(todo => todo.completed === true);
  const lenghtCompletedTodos = todos.filter(todo => todo.completed === true)
    .length;

  const clearCompleted = () => {
    setTodos(todos.filter(item => item.completed !== true));
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${lenghtCompletedTodos} items left`}
      </span>

      <TodosFilter />

      {isCompletedTodos && (
        <button
          type="button"
          className="clear-completed"
          onClick={() => clearCompleted()}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
