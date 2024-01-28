import { useContext } from 'react';
import { TodosFilter } from '../TodosFilter';
import { TodosContext } from '../../contexts/TodosContext';

export const Footer: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const notCompletedTodos = todos.filter(todo => !todo.completed).length;

  const handleOnClickReset = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${notCompletedTodos} ${notCompletedTodos === 1
          ? 'item'
          : 'items'
        } left`}
      </span>

      <TodosFilter />

      {todos.some(todo => todo.completed) && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleOnClickReset}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
