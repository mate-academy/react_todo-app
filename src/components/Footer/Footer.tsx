import { useContext } from 'react';
import { TodosContext } from '../TodosContext/TodosContext';
import { TodosFilter } from '../TodosFilter/TodosFilter';

export const Footer: React.FC = () => {
  const { todos, clearCompletedTodos } = useContext(TodosContext);

  const notCompletedTodos = todos.filter(todo => !todo.completed);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {notCompletedTodos.length === 1
          ? '1 item left'
          : `${notCompletedTodos.length} items left`}
      </span>

      <TodosFilter />

      {todos.some(todo => todo.completed) && (
        <button
          type="button"
          className="clear-completed"
          onClick={clearCompletedTodos}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
