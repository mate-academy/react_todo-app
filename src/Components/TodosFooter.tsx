import { useContext } from 'react';
import { TodosContext } from '../TodosContext/TodosContext';
import { TodosFilter } from './TodosFilter';

export const TodosFooter: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const isTodos = todos.length > 0;

  if (!isTodos) {
    return null;
  }

  const completed = todos.filter(currentTodo => (
    currentTodo.completed === true
  ));

  const clearCompleted = () => {
    const newTodos = todos.filter(item => item.completed !== true);

    setTodos(newTodos);
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${completed.length} items left`}
      </span>

      <TodosFilter />

      {completed.length > 0 && (
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
